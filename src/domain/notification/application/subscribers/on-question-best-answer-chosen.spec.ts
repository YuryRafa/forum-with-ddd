import { beforeEach, describe, expect, it, vi, type MockInstance } from "vitest"
import { DomainEvents } from "../../../../core/events/domain-events.js"
import { InMemoryAnswerAttachmentsRepository } from "../../../../../test/repositories/in-memory-answer-attachments-repository.js"
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository.js"
import { InMemoryNotificationsRepository } from "../../../../../test/repositories/in-memory-notifications-repository.js"
import { makeAnswer } from "../../../../../test/factories/make-answer.js"
import { makeQuestion } from "../../../../../test/factories/make-question.js"
import { SendNotification } from "../use-cases/send-notification.js"
import { OnQuestionBestAnswerChosen } from "./on-question-best-answer-chosen.js"

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotification: SendNotification
let sendNotificationExecuteSpy: MockInstance<SendNotification['execute']>

describe("On Question Best Answer Chosen", () => {
    beforeEach(() => {
        DomainEvents.clearHandlers()
        DomainEvents.clearMarkedAggregates()

        inMemoryAnswersRepository = new InMemoryAnswersRepository(
            new InMemoryAnswerAttachmentsRepository(),
        )
        inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
        sendNotification = new SendNotification(inMemoryNotificationsRepository)
        sendNotificationExecuteSpy = vi.spyOn(sendNotification, "execute")

        new OnQuestionBestAnswerChosen(inMemoryAnswersRepository, sendNotification)
    })

    it("sends a notification to the answer author when their answer is chosen", async () => {
        const question = makeQuestion({ title: "How do I use domain events?" })
        const answer = makeAnswer({ questionId: question.id })
        inMemoryAnswersRepository.items.push(answer)

        question.bestAnswerId = answer.id
        DomainEvents.dispatchEventsForAggregate(question.id)

        await vi.waitFor(() => {
            expect(sendNotificationExecuteSpy).toHaveBeenCalledWith({
                recipientId: answer.authorId.toString(),
                title: "Your answer was chosen as the best answer!",
                content: 'Your answer was chosen as the best answer for "How do I use domain events?".',
            })
        })
    })

    it("does not send a notification when the chosen answer cannot be found", async () => {
        const question = makeQuestion()

        question.bestAnswerId = makeAnswer().id
        DomainEvents.dispatchEventsForAggregate(question.id)

        await vi.waitFor(() => {
            expect(sendNotificationExecuteSpy).not.toHaveBeenCalled()
        })
    })
})
import { beforeEach, describe, expect, it, vi, type MockInstance} from "vitest"
import { InMemoryAnswerAttachmentsRepository } from "../../../../../test/repositories/in-memory-answer-attachments-repository.js"
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository.js"
import { makeAnswer } from "../../../../../test/factories/make-answer.js"
import { OnAnswerCreated } from "./on-answer-created.js"
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository.js"
import { InMemoryQuestionAttachmentsRepository } from "../../../../../test/repositories/in-memory-question-attachments-repository.js"
import { SendNotification, type SendNotificationRequest, type SendNotificationResponse } from "../use-cases/send-notification.js"
import { InMemoryNotificationsRepository } from "../../../../../test/repositories/in-memory-notifications-repository.js"
import { makeQuestion } from "../../../../../test/factories/make-question.js"
import { waitFor } from "../../../../../test/utils/wait-for.js"

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotification: SendNotification

let sendNotificationExecuteSpy: MockInstance<SendNotification['execute']>


describe ('On Answer Created', () => {
    beforeEach(() => {
        inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
        inMemoryAnswersRepository = new InMemoryAnswersRepository(inMemoryAnswerAttachmentsRepository)
        inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
        inMemoryQuestionsRepository = new InMemoryQuestionsRepository(inMemoryQuestionAttachmentsRepository)
        inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
        sendNotification = new SendNotification(inMemoryNotificationsRepository)

        sendNotificationExecuteSpy = vi.spyOn(sendNotification, 'execute')

        new OnAnswerCreated(
            inMemoryQuestionsRepository,
            sendNotification
        )
    })

    it('should be able to send a notification when an answer is created', async () => {
        const question = makeQuestion()
        const answer = makeAnswer({questionId: question.id})
        
        inMemoryQuestionsRepository.create(question)
        inMemoryAnswersRepository.create(answer)

        await waitFor(() => {
            expect(sendNotificationExecuteSpy).toHaveBeenCalled()
        })
        

    })
})
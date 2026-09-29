import { DomainEvents } from "../../../../core/events/domain-events.js";
import type { EventHandler } from "../../../../core/events/event-handler.js";
import type { AnswersRepository } from "../../../forum/application/repositories/answers-repository.js";
import { QuestionBestAnswerChosenEvent } from "../../../forum/enterprise/events/question-best-answer-chosen-event.js";
import type { SendNotification } from "../use-cases/send-notification.js";

export class OnQuestionBestAnswerChosen implements EventHandler {
    constructor(
        private answersRepository: AnswersRepository,
        private sendNotification: SendNotification
    ){
        this.setupSubscriptions()
    }
    
    setupSubscriptions(): void {
        DomainEvents.register(
            this.sendBestAnswerChosenNotification.bind(this),
            QuestionBestAnswerChosenEvent.name
        )
    }

    private async sendBestAnswerChosenNotification({question, bestAnswerId}: QuestionBestAnswerChosenEvent) {
        const answer = await this.answersRepository.findById(
            bestAnswerId.toString(),
        )

        if (answer){
            await this.sendNotification.execute({
                recipientId: answer.authorId.toString(),
                title: "Your answer was chosen as the best answer!",
                content: `Your answer was chosen as the best answer for "${question.title}".`,
            })
        }
    }
}
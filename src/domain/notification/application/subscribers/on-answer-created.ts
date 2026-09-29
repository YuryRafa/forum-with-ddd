import { DomainEvents } from "../../../../core/events/domain-events.js";
import type { EventHandler } from "../../../../core/events/event-handler.js";
import type { QuestionsRepository } from "../../../forum/application/repositories/questions-repository.js";
import { AnswerCreatedEvent } from "../../../forum/enterprise/events/answer-created-event.js";
import type { SendNotification } from "../use-cases/send-notification.js";

export class OnAnswerCreated implements EventHandler {
    constructor(
        private questionsRepository: QuestionsRepository,
        private sendNotification: SendNotification
    ){
        this.setupSubscriptions()
    }
    
    setupSubscriptions(): void {
        DomainEvents.register(
            this.sendNewAnswerNotification.bind(this), 
            AnswerCreatedEvent.name
        )
        
    }

    private async sendNewAnswerNotification({answer}: AnswerCreatedEvent) {
        const question = await this.questionsRepository.findById(
            answer.questionId.toString(),
        )

        if (question){
            await this.sendNotification.execute({
                recipientId: question.authorId.toString(),
                title: `New answer in ${question.title.substring(0, 40).concat('...')}`,
                content: answer.excerpt,
            })
        }


    }
}
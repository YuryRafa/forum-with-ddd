import { UniqueEntityId } from "#/core/entities/unique-entity-id";
import { right, type Either } from "../../../../core/either.js";
import { Notification } from "../../enterprise/entities/notification.js"
import type { NotificationsRepository } from "../repositories/notifications-repository.js";


interface SendNotificationRequest {
    recipientId: string
    title: string
    content: string

}

type SendNotificationResponse = Either<Error, { notification: Notification }>
export class SendNotification{

    constructor (
        private notificationsRepository: NotificationsRepository
    ) {}
    
    async execute({recipientId, title, content}: SendNotificationRequest): Promise<SendNotificationResponse> {

        const notification = Notification.create({
            recipientId: new UniqueEntityId(recipientId),
            title,
            content,

        })

                
        await this.notificationsRepository.create(notification)
        
        return right({
            notification
        })
    }
}


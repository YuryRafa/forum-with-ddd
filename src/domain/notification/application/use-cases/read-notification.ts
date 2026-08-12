import { UniqueEntityId } from "#/core/entities/unique-entity-id";
import { right, type Either } from "../../../../core/either.js";
import { Notification } from "../../enterprise/entities/notification.js"
import type { NotificationsRepository } from "../repositories/notifications-repository.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";


interface ReadNotificationRequest {
    recipientId: string
    notificationId: string

}

type ReadNotificationResponse = Either<Error, { notification: Notification }>
export class ReadNotification{

    constructor (
        private notificationsRepository: NotificationsRepository
    ) {}
    
    async execute({recipientId, notificationId}: ReadNotificationRequest): Promise<ReadNotificationResponse> {

        if (!notificationId){
            throw new ResourceNotFoundError
        }
                
        const notification = await this.notificationsRepository.findById(notificationId)

        if (recipientId !== notification?.recipientId.toString()){
            throw new NotAllowedError
        }

        notification.read()

        await this.notificationsRepository.save(notification)

        return right({
            notification
        })
    }
}


import type { NotificationsRepository } from "../../src/domain/notification/application/repositories/notifications-repository.js";
import type { Notification } from "../../src/domain/notification/enterprise/entities/notification.js";

export class InMemoryNotificationsRepository implements NotificationsRepository {
    public items: Notification[] = []

    async create(notification: Notification): Promise<Notification> {
        this.items.push(notification)
        return notification
    }

}
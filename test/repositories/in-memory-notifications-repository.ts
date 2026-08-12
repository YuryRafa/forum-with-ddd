import type { NotificationsRepository } from "../../src/domain/notification/application/repositories/notifications-repository.js";
import type { Notification } from "../../src/domain/notification/enterprise/entities/notification.js";

export class InMemoryNotificationsRepository implements NotificationsRepository {
    public items: Notification[] = []

    async create(notification: Notification): Promise<Notification> {
        this.items.push(notification)
        return notification
    }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = this.items.find(item => item.id.toString() == notificationId)
        return notification ?? null
    }
    async save(notification: Notification): Promise<Notification> {
        const foundIndex = this.items.findIndex(item => item.id.toString() == notification?.id.toString())
        this.items[foundIndex] = notification
        return notification
    }

}
import type { Notification } from "../../enterprise/entities/notification.js";

export interface NotificationsRepository {
    create(notification: Notification):Promise<Notification>
    findById(notificationId: string): Promise<Notification | null>
    save(notification: Notification):Promise<Notification>
}
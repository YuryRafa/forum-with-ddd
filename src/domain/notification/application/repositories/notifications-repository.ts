import type { Notification } from "#/domain/notification/enterprise/entities/notification";

export interface NotificationsRepository {
    create(notification: Notification):Promise<Notification>
    findById(notificationId: string): Promise<Notification | null>
    save(notification: Notification):Promise<Notification>
}
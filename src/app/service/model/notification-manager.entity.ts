export class NotificationManager {
  notifications: Notification[];

  constructor() {
    this.notifications = [];
  }

  createNotification(notification: Notification): void {}
  sendNotification(notification: Notification): void {}
}

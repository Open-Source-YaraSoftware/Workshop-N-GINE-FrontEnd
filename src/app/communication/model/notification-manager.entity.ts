import {Notification} from "./notification.entity";

export class NotificationManager {
  notifications: Notification[];

  constructor() {
    this.notifications = [];
  }
}

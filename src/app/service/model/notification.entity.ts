import {User} from "./user.entity";
import {NotificationState} from "./notification-state.enum";

export class Notification {
  id: number;
  title: string;
  message: string;
  user: User;
  state: NotificationState;

  constructor() {
    this.id = 0;
    this.title = '';
    this.message = '';
    this.user = new User();
    this.state = NotificationState.UNREAD;
  }
}

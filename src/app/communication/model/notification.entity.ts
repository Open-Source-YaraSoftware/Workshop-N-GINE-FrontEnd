import {User} from "../../service/model/user.entity";
import {NotificationState} from "./notification-state.enum";

export class Notification {
  id: number;
  date: string;
  content: string;
  userId: User;
  state: NotificationState;
  endpoint: string;

  constructor() {
    this.id = 0;
    this.date = '';
    this.content = '';
    this.userId = new User();
    this.state = NotificationState.UNREAD;
    this.endpoint = '';
  }
}

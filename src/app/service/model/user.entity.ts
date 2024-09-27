import {Role} from "./role.enum";
import {Workshop} from "./workshop.entity";
import {AccountState} from "./account-state.enum";

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  workshop: Workshop;
  accountState: AccountState;
  notificationList: Notification[];

  constructor() {
    this.id = 0;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.role = Role.CLIENT;
    this.workshop = new Workshop();
    this.accountState = AccountState.ACTIVE;
    this.notificationList = [];
  }

  logIn(): boolean { return true; }
  logOut(): boolean { return true; }
}

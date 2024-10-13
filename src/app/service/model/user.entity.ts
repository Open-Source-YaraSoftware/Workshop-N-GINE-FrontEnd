import {Role} from "./role.enum";
import {Workshop} from "./workshop.entity";
import {AccountState} from "./account-state.enum";

export class User {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  image: string;
  email: string;
  password: string;
  role: Role;
  age: number;
  location: string;
  workshop: Workshop;
  state: AccountState;
  notificationList: Notification[];

  constructor() {
    this.id = 0;
    this.firstName = '';
    this.lastName = '';
    this.dni = '';
    this.image = 'https://xsgames.co/randomusers/avatar.php?g=female';
    this.email = '';
    this.password = '';
    this.role = Role.CLIENT;
    this.age = 0;
    this.location = '';
    this.workshop = new Workshop();
    this.state = AccountState.ACTIVE;
    this.notificationList = [];
  }

}

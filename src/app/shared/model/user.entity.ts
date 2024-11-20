import {AccountState} from "./account-state.enum";
import {Role} from "./role.enum";

export class User {
  id: number;
  firstName: string;
  lastName: string;
  dni: number;
  email: string;
  state: AccountState;
  role: Role;
  // TODO: add workshop: Workshop;
  age: number;
  location: string;

  constructor({id = 0, firstName = '', lastName = '', dni = 0, email = '', state = AccountState.ACTIVE, role = Role.CLIENT, age = 0, location = ''}={}) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dni = dni;
    this.email = email;
    this.state = AccountState[state];
    this.role = Role[role];
    this.age = age;
    this.location = location;
  }
}

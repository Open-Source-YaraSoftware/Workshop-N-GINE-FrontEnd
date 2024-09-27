import {User} from "./user.entity";
import {IotDispositive} from "./iot-dispositive.entity";
import {Intervention} from "./intervention.entity";

export class Vehicle {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  owner: User;
  iotDispositive: IotDispositive;
  interventionRegister: Intervention[];

  constructor() {
    this.id = 0;
    this.licensePlate = '';
    this.brand = '';
    this.model = '';
    this.owner = new User();
    this.iotDispositive = new IotDispositive();
    this.interventionRegister = [];
  }

}

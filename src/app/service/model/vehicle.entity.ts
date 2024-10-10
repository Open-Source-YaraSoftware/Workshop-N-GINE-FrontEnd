import {User} from "./user.entity";
import {IotDispositive} from "./iot-dispositive.entity";
import {Intervention} from "./intervention.entity";

export class Vehicle {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  owner: User;
  image: string;
  iotDispositive: IotDispositive;
  interventionRegister: Intervention[];

  constructor() {
    this.id = 0;
    this.licensePlate = '';
    this.brand = '';
    this.model = '';
    this.owner = new User();
    this.image = '';
    this.iotDispositive = new IotDispositive();
    this.interventionRegister = [];
  }

}

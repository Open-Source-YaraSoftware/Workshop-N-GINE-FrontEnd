import {User} from "../../service/model/user.entity";
import {Vehicle} from "../../service/model/vehicle.entity";

export class WorkshopClient extends User{
  vehicles: Vehicle[];
  constructor() {
    super();
    this.vehicles = [];
  }
}

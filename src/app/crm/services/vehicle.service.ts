import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Vehicle} from "../../service/model/vehicle.entity";

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends BaseService<Vehicle> {
  constructor() {
    super();
    this.resourceEndpoint = '/vehicles';
  }
}

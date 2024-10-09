import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Vehicle} from "../../service/model/vehicle.entity";
import {catchError, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends BaseService<Vehicle> {
  constructor() {
    super();
    this.resourceEndpoint = '/vehicles';
  }
  getByClientId(clientId: number) {
    return this.http.get<Vehicle[]>(`${this.resourcePath()}?owner.id=${clientId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}

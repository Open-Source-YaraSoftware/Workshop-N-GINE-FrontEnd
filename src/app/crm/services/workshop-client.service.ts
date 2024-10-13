import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {WorkshopClient} from "../model/workshop-client.entity";
import {catchError, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkshopClientService extends BaseService<WorkshopClient> {

  constructor() {
    super();
    this.resourceEndpoint = '/clients';
  }

  getByWorkshopId(workshopId: number) {
    return this.http.get<WorkshopClient[]>(`${this.resourcePath()}?workshop.id=${workshopId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}

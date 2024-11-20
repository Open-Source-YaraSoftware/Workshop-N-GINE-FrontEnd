import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Workshop} from "../model/workshop.entity";
import {catchError, Observable, retry} from "rxjs";
import {Intervention} from "../model/intervention.entity";
import {Profile} from "../../profiles/model/profile.entity";

@Injectable({
  providedIn: 'root'
})
export class WorkshopService extends BaseService<Workshop>{

  constructor() {
    super();
    this.resourceEndpoint = '/workshops';
  }

  public getAllInterventionsByWorkshopId(workshopId: number) :Observable<Intervention[]> {
    return this.http.get<Intervention[]>(`${this.resourcePath()}/${workshopId}/interventions`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  public getClientsIdsByWorkshopId(workshopId: number) :Observable<number[]> {
    return this.http.get<number[]>(`${this.resourcePath()}/${workshopId}/clients`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  public getMechanicsIdsByWorkshopId(workshopId: number) :Observable<number[]> {
    return this.http.get<number[]>(`${this.resourcePath()}/${workshopId}/mechanics`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  public postMechanicByWorkshopId(workshopId: number, data: any): Observable<Profile> {
    console.log(data);
    return this.http.post<Profile>(`${this.resourcePath()}/${workshopId}/mechanics`, data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

}

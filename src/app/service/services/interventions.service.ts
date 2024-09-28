import { Injectable } from '@angular/core';
import { Intervention } from '../model/intervention.entity';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterventionsService extends BaseService<Intervention> {

  constructor() {
    super();
    this.resourceEndpoint = '/interventions';
  }
  getAllInterventions(): Observable<Intervention[]> {
    return this.http.get<Intervention[]>(this.resourcePath(), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  postIntervention(data: any): Observable<Intervention> {
    return this.http.post<Intervention>(this.resourcePath(), data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  getByMechanicLeaderId(leaderId: number){
    return this.http.get<Intervention>(`${this.resourcePath()}?leader.id=${leaderId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}

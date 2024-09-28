import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';
import { Mechanic } from '../model/mechanic.entity';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PersonnelService extends BaseService<Mechanic> {
  constructor() {
    super();
    this.resourceEndpoint = '/mechanics';
  }

  getByWorkshopId(workshopId: number) {
    return this.http.get<Mechanic[]>(`${this.resourcePath()}?workshop.id=${workshopId}`, this.httpOptions)
  .pipe(retry(2), catchError(this.handleError));
  }

  getAllPersonnel(): Observable<Mechanic[]> {
    return this.http.get<Mechanic[]>(this.resourcePath(), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  postPersonnel(data: any): Observable<Mechanic> {
    return this.http.post<Mechanic>(this.resourcePath(), data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getMechanicById(id: number): Observable<Mechanic> {
    return this.http.get<Mechanic>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  putMechanic(data: any): Observable<Mechanic> {
    return this.http.put<Mechanic>(`${this.resourcePath()}/${data.id}`, data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Add deleteMechanic method here
  deleteMechanic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.resourcePath()}/${id}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}

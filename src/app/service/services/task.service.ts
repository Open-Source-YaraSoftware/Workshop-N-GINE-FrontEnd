import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Task} from "../model/task.entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService<Task> {

  constructor() {
    super();
    this.resourceEndpoint = '/tasks';
  }

  public getByMechanicId(mechanicId: number): Observable<Task> {
    return this.http.get<Task>(`${this.resourcePath()}?assistant.id=${mechanicId}`, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }
}

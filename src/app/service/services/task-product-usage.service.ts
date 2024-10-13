import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {TaskProductUsage} from "../model/task-product-usage.entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskProductUsageService extends BaseService<TaskProductUsage>{

  constructor() {
    super();
    this.resourceEndpoint = '/task-products-usage';
  }

    public getAllByTaskId(taskId: number): Observable<TaskProductUsage[]> {
    return this.http.get<TaskProductUsage[]>(`${this.resourcePath()}?taskId=${taskId}`, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }
}

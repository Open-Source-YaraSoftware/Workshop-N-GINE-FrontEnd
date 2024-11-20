import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Checkpoint} from "../model/checkpoint.entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckpointService extends BaseService<Checkpoint>{

  constructor() {
    super();
    this.resourceEndpoint = '/checkpoints';
  }

  public getAllByTaskId(taskId: number): Observable<Checkpoint[]> {
    return this.http.get<Checkpoint[]>(`${this.resourcePath()}?taskId=${taskId}`, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }
}

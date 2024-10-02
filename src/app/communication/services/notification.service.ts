import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Notification} from "../model/notification.entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseService<Notification>{
  constructor() {
    super();
    this.resourceEndpoint = '/notifications';
  }

  public getByUserId(userId: number): Observable<Array<Notification>>{
    return this.http.get<Array<Notification>>(`${this.resourcePath()}?userid=${userId}`, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError));
  }

}

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

  public updateState(notification: Notification, newState: number): Observable<Notification>{
    const updateData = {state: newState}
    return this.http.patch<Notification>(`${this.resourcePath()}/${notification.id}`, updateData, this.httpOptions)
  }

}

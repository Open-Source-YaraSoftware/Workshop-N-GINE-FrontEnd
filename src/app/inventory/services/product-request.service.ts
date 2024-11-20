import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {ProductRequest} from "../model/product-request.entity";
import {catchError, Observable, retry, concatMap, delay, from} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ProductRequestService extends BaseService<ProductRequest> {

  constructor() {
    super();
    this.resourceEndpoint = '/products-request';
  }

  public getAllByTaskId(taskId: number): Observable<ProductRequest[]> {
    return this.http.get<ProductRequest[]>(`${this.resourcePath()}?taskId=${taskId}`, this.httpOptions)
        .pipe(retry(2),catchError(this.handleError));
  }

  public getByWorkshopId(workshopId: number){
    return this.http.get<ProductRequest[]>(`${this.resourcePath()}?workshopId=${workshopId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public updateRequests(requests: ProductRequest[], status: String) {
    if(status === 'ACCEPTED') {
      return this.acceptRequests(requests);
    }
    else if (status === 'REJECTED') {
      return this.rejecttRequests(requests);
    }else {
      throw new Error('Invalid status');
    }
  }

  public acceptRequests(requests: ProductRequest[]) {
    return from(requests).pipe(
      concatMap(request => {
        return this.http.post<ProductRequest>(`${this.resourcePath()}/${request.id}/accept`, this.httpOptions)
          .pipe(delay(20));
      })
    );
  }

  public rejecttRequests(requests: ProductRequest[]) {
    return from(requests).pipe(
      concatMap(request => {
        return this.http.post<ProductRequest>(`${this.resourcePath()}/${request.id}/reject`, this.httpOptions)
          .pipe(delay(20));
      })
    );
  }
}

import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {ProductRequest} from "../model/product-request.entity";
import {catchError, Observable, retry, concatMap, delay, from} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProductRequestService extends BaseService<ProductRequest>{

  constructor() {
    super();
    this.resourceEndpoint= '/products-request';
  }

  public getAllByTaskId(taskId: number): Observable<ProductRequest[]> {
    return this.http.get<ProductRequest[]>(`${this.resourcePath()}?taskId=${taskId}`, this.httpOptions)
        .pipe(retry(2),catchError(this.handleError));
  }

  getByWorkshopId(workshopId: number){
    return this.http.get<ProductRequest[]>(`${this.resourcePath()}?workshopId=${workshopId}&status=0`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateRequests(requests: ProductRequest[], newStatus: String) {
    return from(requests).pipe(
      concatMap(request => {
        const updateData = { status: newStatus };
        return this.http.patch<ProductRequest>(`${this.resourcePath()}/${request.id}`, updateData, this.httpOptions)
          .pipe(delay(20));
      })
    );
  }


}

import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {ProductRequest} from "../model/product-request.entity";
import {catchError, Observable, retry} from "rxjs";

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
}

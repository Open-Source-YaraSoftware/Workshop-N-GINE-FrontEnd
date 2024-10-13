import { Injectable } from '@angular/core';
import {catchError, concatMap, delay, from, retry} from "rxjs";
import {ProductRequest} from "../model/product-request.entity";
import {BaseService} from "../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class ProductRequestService extends BaseService<ProductRequest>{

  constructor() {
    super();
    this.resourceEndpoint= '/products-request';
  }

  getByWorkshopId(workshopId: number){
    return this.http.get<ProductRequest[]>(`${this.resourcePath()}?workshop.id=${workshopId}&status=PENDING&_expand=task`, this.httpOptions)
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

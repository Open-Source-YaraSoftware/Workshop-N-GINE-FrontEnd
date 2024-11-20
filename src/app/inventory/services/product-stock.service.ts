import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {ProductStock} from "../model/product-stock.entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductStockService extends BaseService<ProductStock>{

  constructor() {
    super();
    this.resourceEndpoint = '/products';
  }

  public getByWorkshopId(workshopId: number){
    return this.http.get<ProductStock[]>(`${this.resourcePath()}?workshopId=${workshopId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));

  }

  public deleteItem(deletedRowId: number): Observable<any> {
    return this.http.delete(`${this.resourcePath()}/${deletedRowId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public editItem(updatedRow: ProductStock): Observable<ProductStock> {
   return this.http.put<ProductStock>(`${this.resourcePath()}/${updatedRow.id}`, updatedRow, this.httpOptions)
     .pipe(retry(2), catchError(this.handleError));
  }

}

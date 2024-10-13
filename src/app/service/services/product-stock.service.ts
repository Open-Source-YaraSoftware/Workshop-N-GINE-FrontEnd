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
    this.resourceEndpoint = '/products-stock';
  }

  public getByWorkshopId(workshopId: number){
    return this.http.get<ProductStock[]>(`${this.resourcePath()}?workshop.id=${workshopId}&_expand=productType`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));

  }

  public deleteItem(deletedRow: ProductStock): Observable<any> {
    return this.http.delete(`${this.resourcePath()}/${deletedRow.id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public editItem(updatedRow: ProductStock): Observable<ProductStock> {
   return this.http.put<ProductStock>(`${this.resourcePath()}/${updatedRow.id}`, updatedRow, this.httpOptions)
     .pipe(retry(2), catchError(this.handleError));
  }
  
}
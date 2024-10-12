import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {ProductStock} from "../model/product-stock.entity";

@Injectable({
  providedIn: 'root'
})
export class ProductStockService extends BaseService<ProductStock>{

  constructor() {
    super();
    this.resourceEndpoint = '/products-stock';
  }
}

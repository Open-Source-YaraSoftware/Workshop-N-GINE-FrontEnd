import {ProductStock} from "./product-stock.entity";

export class ProductType {
  id: number;
  name: string;
  productStockList: ProductStock[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.productStockList = [];
  }
}

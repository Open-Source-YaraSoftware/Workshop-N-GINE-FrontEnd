import {Workshop} from "./workshop.entity";
import {ProductType} from "./product-type.entity";
import {TaskStock} from "./task-stock.entity";

export class ProductStock {
  id: number;
  workshop: Workshop;
  amount: number;
  productType: ProductType;
  taskStockList: TaskStock[];

  constructor() {
    this.id = 0;
    this.workshop = new Workshop();
    this.amount = 0;
    this.productType = new ProductType();
    this.taskStockList = [];
  }

  updateStock(quantity: number): void {
    this.amount += quantity; // Ejemplo de cómo actualizar el stock
  }

  getItemDetails(): string {
    return `Product: ${this.productType.name}, Amount: ${this.amount}`;
  }
}

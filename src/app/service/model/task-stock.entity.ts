import {Task} from "./task.entity";
import {ProductStock} from "./product-stock.entity";

export class TaskStock {
  id: number;
  task: Task;
  productInventory: ProductStock;
  quantityUsed: number;
  requestDate: Date;

  constructor() {
    this.id = 0;
    this.task = new Task();
    this.productInventory = new ProductStock();
    this.quantityUsed = 0;
    this.requestDate = new Date();
  }
}

import {Workshop} from "./workshop.entity";
import {Task} from "./task.entity";
import {ProductRequestState} from "./product-request-state.enum";

export class ProductRequest {
  id: number;
  workshop: Workshop;
  task: Task;
  requestedDate: Date;
  requestedQuantity: number;
  status: ProductRequestState;
  name: string;

  constructor() {
    this.id = 0;
    this.workshop = new Workshop();
    this.task = new Task();
    this.requestedDate = new Date();
    this.requestedQuantity = 0;
    this.status = ProductRequestState.PENDING;
    this.name = '';
  }
}

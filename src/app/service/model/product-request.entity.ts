import {Workshop} from "./workshop.entity";
import {Task} from "./task.entity";
import {ProductRequestState} from "./product-request-state.enum";
import {ProductType} from "./product-type.entity";

export class ProductRequest {
  id: number;
  workshop: Workshop;
  task: Task;
  requestedDate: String;
  requestedQuantity: number;
  status: ProductRequestState;
  name: string;

  constructor({
                id = 0,
                workshop = new Workshop(),
                task = new Task(),
                requestedDate = '',
                requestedQuantity = 0,
                status = ProductRequestState.PENDING,
                name =  ''
              }={}) {
    this.id = id;
    this.workshop = workshop;
    this.task = task;
    this.requestedDate = requestedDate;
    this.requestedQuantity = requestedQuantity;
    this.status = status;
    this.name = name;
  }
}

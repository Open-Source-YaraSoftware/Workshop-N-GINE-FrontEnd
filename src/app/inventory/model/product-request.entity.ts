import {ProductRequestState} from "./product-request-state.enum";

export class ProductRequest {
  id: number;
  requestedQuantity: number;
  workshopId: number;
  taskId: number;
  productId: number;
  status: ProductRequestState;

  constructor({
                id = 0,
                requestedQuantity = 0,
                workshopId = 0,
                taskId = 0,
                productId = 0,
                status = ProductRequestState.PENDING
              }={}) {
    this.id = id;
    this.requestedQuantity = requestedQuantity;
    this.workshopId = workshopId;
    this.taskId = taskId;
    this.productId = productId;
    this.status = status;
  }
}

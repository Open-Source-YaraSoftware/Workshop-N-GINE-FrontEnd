import {TaskState} from "./task-state.enum";
import {Mechanic} from "./mechanic.entity";
import {Intervention} from "./intervention.entity";
import {ProductRequest} from "./product-request.entity";
import {TaskStock} from "./task-stock.entity";
import {Checkpoint} from "./checkpoint.entity";

export class Task {
  id: number;
  state: TaskState;
  mechanic: Mechanic;
  intervention: Intervention;
  productRequestList: ProductRequest[];
  stockList: TaskStock[];
  checkpoint: Checkpoint;
  description: string;

  constructor() {
    this.id = 0;
    this.state = TaskState.PENDING;
    this.mechanic = new Mechanic();
    this.intervention = new Intervention();
    this.productRequestList = [];
    this.stockList = [];
    this.checkpoint = new Checkpoint();
    this.description = '';
  }

  updateTaskState(state: TaskState): void {}
  getTaskDetails(): string { return ''; }
}

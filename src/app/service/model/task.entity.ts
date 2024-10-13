import {TaskState} from "./task-state.enum";
import {Mechanic} from "./mechanic.entity";
import {Intervention} from "./intervention.entity";
import {ProductRequest} from "./product-request.entity";
import {TaskStock} from "./task-stock.entity";
import {Checkpoint} from "./checkpoint.entity";

export class Task {
  id: number;
  state: TaskState;
  assistant: Mechanic;
  intervention: Intervention;
  productRequestList: ProductRequest[];
  stockList: TaskStock[];
  checkpoint: Checkpoint;
  description: string;

  constructor() {
    this.id = Math.floor(Math.random() * 100000);
    this.state = TaskState.PENDING;
    this.assistant = new Mechanic();
    this.intervention = new Intervention();
    this.productRequestList = [];
    this.stockList = [];
    this.checkpoint = new Checkpoint();
    this.description = '';
  }

  updateTaskState(state: TaskState): void {}
  getTaskDetails(): string { return ''; }
}

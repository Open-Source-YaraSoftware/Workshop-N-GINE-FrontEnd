import {Task} from "./task.entity";

export class Checkpoint {
  id: number;
  name: string;
  task: Task;

  constructor() {
    this.id = 0;
    this.name = '';
    this.task = new Task();
  }
}

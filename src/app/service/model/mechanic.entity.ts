import {Task} from "./task.entity";
import {User} from "./user.entity";

export class Mechanic extends User {
  taskList: Task[];

  constructor() {
    super();
    this.taskList = [];
  }

  assignTask(task: Task): void {}
  completeTask(task: Task): void {}
}

export class Checkpoint {
  id: number;
  name: string;
  taskId: number;

  constructor({
    id = 0,
    name = '',
    taskId = 0
  }={}) {
    this.id = id;
    this.name = name;
    this.taskId = taskId;
  }
}

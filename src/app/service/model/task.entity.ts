import {Mechanic} from "./mechanic.entity";
import {Intervention} from "./intervention.entity";
import {Checkpoint} from "./checkpoint.entity";
import {TaskState} from "./task-state.enum";


export class Task {
  id: number;
  assistant: Mechanic;
  intervention: Intervention;
  tracking: Checkpoint[];
  state: TaskState;
  description: string;

  constructor({id = 0, assistant = new Mechanic(), intervention = new Intervention(), tracking = [], state = TaskState.PENDING, description = ''}={}) {
  this.id = id;
  this.assistant = assistant;
  this.intervention = intervention;
  this.tracking = tracking;
  this.state = TaskState[state];
  this.description = description;
  }
}

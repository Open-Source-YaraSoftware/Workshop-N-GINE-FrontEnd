import {InterventionState} from "./intervention-state.enum";
import {InterventionType} from "./intervention-type.enum";
import {Workshop} from "./workshop.entity";
import {Vehicle} from "./vehicle.entity";
import {Task} from "./task.entity";


export class Intervention {
  id: number;
  workshop: Workshop;
  vehicle: Vehicle;
  state: InterventionState;
  registrationDate: Date;
  completionDate: Date;
  interventionType: InterventionType;
  taskList: Task[];

  constructor() {
    this.id = 0;
    this.workshop = new Workshop();
    this.vehicle = new Vehicle();
    this.state = InterventionState.PENDING;
    this.registrationDate = new Date();
    this.completionDate = new Date();
    this.interventionType = InterventionType.REPARATION;
    this.taskList = [];
  }

  updateInterventionState(state: InterventionState): void {}
  deleteTask(task: Task): void {}
}

import {InterventionState} from "./intervention-state.enum";
import {InterventionType} from "./intervention-type.enum";
import {Workshop} from "./workshop.entity";
import {Vehicle} from "./vehicle.entity";
import {Task} from "./task.entity";
import {Mechanic} from "./mechanic.entity";


export class Intervention {
  id: number;
  state: InterventionState;
  registrationDate: Date;
  completionDate: Date;
  interventionType: InterventionType;
  description: string;
  workshop: Workshop;
  vehicle: Vehicle;
  leader: Mechanic;
  taskList: Task[];

  constructor() {
    this.id = 0;
    this.state = InterventionState.PENDING;
    this.registrationDate = new Date();
    this.completionDate = new Date();
    this.interventionType = InterventionType.MAINTENANCE;
    this.description = '';
    this.workshop = new Workshop();
    this.vehicle = new Vehicle();
    this.leader = new Mechanic();
    this.taskList = [];
  }

}

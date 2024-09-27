import {InterventionState} from "./intervention-state.enum";
import {InterventionType} from "./intervention-type.enum";

export class Intervention {
  id: number;
  registrationDate: Date;
  completionDate: Date;
  state: InterventionState;
  interventionType: InterventionType;

  constructor({id = 0, registrationDate = new Date(), completionDate = new Date(), state = InterventionState.PENDING, interventionType = InterventionType.REPARATION}={}) {
    this.id = id;
    this.registrationDate = registrationDate;
    this.completionDate = completionDate;
    this.state = InterventionState[state];
    this.interventionType = InterventionType[interventionType];
  }
}

import {MembershipType} from "./membership-type.enum";
import {User} from "./user.entity";
import {Mechanic} from "./mechanic.entity";
import {ProductStock} from "./product-stock.entity";
import {Intervention} from "./intervention.entity";

export class Workshop {
  id: number;
  name: string;
  membershipType: MembershipType;

  constructor() {
    this.id = 0;
    this.name = '';
    this.membershipType = MembershipType.BASIC;
  }

  addItemToInventory(item: ProductStock): void {}
  createInterventionRequest(request: Request): void {}
}

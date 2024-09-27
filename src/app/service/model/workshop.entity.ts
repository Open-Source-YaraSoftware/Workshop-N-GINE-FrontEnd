import {MembershipType} from "./membership-type.enum";
import {User} from "./user.entity";
import {Mechanic} from "./mechanic.entity";
import {ProductStock} from "./product-stock.entity";
import {Intervention} from "./intervention.entity";

export class Workshop {
  id: number;
  name: string;
  membershipType: MembershipType;
  owner: User;
  clientList: User[];
  mechanicList: Mechanic[];
  productStockList: ProductStock[];
  interventionList: Intervention[];

  constructor() {
    this.id = 0;
    this.name = '';
    this.membershipType = MembershipType.BASIC;
    this.owner = new User();
    this.clientList = [];
    this.mechanicList = [];
    this.productStockList = [];
    this.interventionList = [];
  }

  addItemToInventory(item: ProductStock): void {}
  createInterventionRequest(request: Request): void {}
}

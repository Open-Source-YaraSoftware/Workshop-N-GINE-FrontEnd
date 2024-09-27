import {Code} from "./code.entity";

export class IotDispositive {
  id: number;
  codeList: Code[];

  constructor() {
    this.id = 0;
    this.codeList = [];
  }

  addCode(code: Code): void {}
}

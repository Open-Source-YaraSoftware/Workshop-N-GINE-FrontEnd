import {CodeState} from "./code-state.enum";

export class Code {
  id: number;
  component: string;
  fault: string;
  scanDate: Date;
  state: CodeState;
  description: string;

  constructor() {
    this.id = 0;
    this.component = '';
    this.fault = '';
    this.scanDate = new Date();
    this.state = CodeState.FAILED;
    this.description = '';
  }
}

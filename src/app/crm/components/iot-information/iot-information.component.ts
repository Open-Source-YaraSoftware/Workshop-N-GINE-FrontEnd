import {Component, Input, SimpleChanges} from '@angular/core';
import {Vehicle} from "../../../service/model/vehicle.entity";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {Code} from "../../../service/model/code.entity";

@Component({
  selector: 'app-iot-information',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCellDef,
    MatCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  templateUrl: './iot-information.component.html',
  styleUrl: './iot-information.component.css'
})
export class IotInformationComponent {
  displayedColumns: string[] = ['Component', 'State', 'Error Code'];
  @Input() vehicle!: Vehicle;
  dataSource: Code[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vehicle'] && changes['vehicle'].currentValue) {
      this.dataSource = this.vehicle.iotDispositive.codeList || [];
    }
  }
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage
} from "@angular/material/card";
import {Vehicle} from "../../../service/model/vehicle.entity";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-vehicle-item',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardImage,
    DatePipe
  ],
  templateUrl: './vehicle-item.component.html',
  styleUrl: './vehicle-item.component.css'
})
export class VehicleItemComponent {
  @Input() vehicle!: Vehicle;
  @Input() index!: number;

  @Output() selectedVehicle = new EventEmitter<Vehicle>();

  constructor() {

  }
  selectVehicle(): void {
    this.selectedVehicle.emit(this.vehicle);
  }
}

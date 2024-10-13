import {Component, inject} from '@angular/core';
import {IotInformationComponent} from "../../components/iot-information/iot-information.component";
import {PreviousInterventionsComponent} from "../../components/previous-interventions/previous-interventions.component";
import {ActivatedRoute} from "@angular/router";
import {NgComponentOutlet, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {VehicleService} from "../../services/vehicle.service";
import {Vehicle} from "../../../service/model/vehicle.entity";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [
    NgIf,
    NgComponentOutlet,
    MatButton,
    PreviousInterventionsComponent,
    IotInformationComponent,
    MatIcon,
    MatToolbar
  ],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.css'
})
export class VehicleDetailComponent {
  private vehicleId: string = '';
  protected currentView: 'activityLog' | 'iotInformation' | null = null;
  private vehicleService = inject(VehicleService);
  protected vehicle: Vehicle = new Vehicle();

  constructor(private route: ActivatedRoute) {
    this.loadVehicleIdFromRoute();
    this.loadVehicleData();
  }

  private loadVehicleData() {
    this.vehicleService.getById(this.vehicleId).subscribe(vehicle => {
      this.vehicle = vehicle;
      this.showActivityLog();
    });
  }

  private loadVehicleIdFromRoute() {
    this.route.params.subscribe(params => {
      this.vehicleId = params['id'] || '';
    });
  }

  showActivityLog() {
    this.currentView = 'activityLog';
  }

  showIotInformation() {
    this.currentView = 'iotInformation';
  }
}

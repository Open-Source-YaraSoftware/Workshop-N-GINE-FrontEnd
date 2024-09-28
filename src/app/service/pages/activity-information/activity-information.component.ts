import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Vehicle} from "../../model/vehicle.entity";
import {VehicleService} from "../../../crm/services/vehicle.service";
import {GeneralInfoComponent} from "../../components/general-info/general-info.component";
import {IotInformationComponent} from "../../../crm/components/iot-information/iot-information.component";
import {
  PreviousInterventionsComponent
} from "../../../crm/components/previous-interventions/previous-interventions.component";

@Component({
  selector: 'app-activity-information',
  standalone: true,
  imports: [
    GeneralInfoComponent,
    IotInformationComponent,
    PreviousInterventionsComponent
  ],
  templateUrl: './activity-information.component.html',
  styleUrl: './activity-information.component.css'
})
export class ActivityInformationComponent {
  cardId: number = 0;
  vehicle = signal<Vehicle>(new Vehicle());

  vehicleService: VehicleService = inject(VehicleService);

  constructor(private route: ActivatedRoute) {
    this.searchQueryParams();
    this.getVehicle();
  }

  searchQueryParams() {
    this.route.queryParams
      .subscribe(params => {
        this.cardId = params['cardId'] || 0;
      });
  }
  getVehicle() {
    this.vehicleService.getById(this.cardId)
      .subscribe((vehicle: Vehicle) => {
        this.vehicle.set(vehicle);
        console.log(this.vehicle());
      });
  }
}

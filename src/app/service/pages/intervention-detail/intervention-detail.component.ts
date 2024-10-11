import {Component, OnInit, inject} from '@angular/core';
import {InterventionsService} from '../../services/interventions.service';
import {ActivatedRoute} from '@angular/router';
import {Intervention} from '../../model/intervention.entity';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {ReplaceUnderscorePipe} from '../../../shared/utilities/replace-underscore.pipe';
import {NgIf, TitleCasePipe} from '@angular/common';
import {GeneralInformationComponent} from '../../components/general-information/general-information.component';
import {PersonnelService} from "../../services/personnel.service";
import {Mechanic} from "../../model/mechanic.entity";
import {VehicleService} from "../../../crm/services/vehicle.service";
import {Vehicle} from "../../model/vehicle.entity";

@Component({
  selector: 'app-intervention-detail',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    MatToolbar,
    ReplaceUnderscorePipe,
    TitleCasePipe,
    NgIf,
    GeneralInformationComponent
  ],
  templateUrl: './intervention-detail.component.html',
  styleUrl: './intervention-detail.component.css'
})
export class InterventionDetailComponent implements OnInit {
  private interventionService = inject(InterventionsService);
  private personnelService = inject(PersonnelService);
  private vehicleService = inject(VehicleService);
  private route = inject(ActivatedRoute);
  protected interventionId: string = '';
  protected currentView: 'generalInformation' | 'interventionSummary' | null = null;
  protected intervention: Intervention = new Intervention();
  protected mechanics : Mechanic[] = [];
  protected vehicles: Vehicle[] = [];

  ngOnInit(): void {
    this.loadInterventionId();
    this.loadPersonnelData();
    this.loadInterventionData();
    this.loadVehiclesData();
  }

  private loadInterventionId() {
    this.route.params.subscribe(params => {
      this.interventionId = params['id'] || '';
    });
  }

  private loadInterventionData() {
    this.interventionService.getById(this.interventionId).subscribe(intervention => {
        this.intervention = intervention;
        this.showGeneralInformation();
      }
    );
  }

  private loadPersonnelData() {
    this.personnelService.getAll().subscribe(personnel => {
        this.mechanics = personnel;
    });
  }

  private loadVehiclesData() {
    this.vehicleService.getByClientDni(this.intervention.vehicle.owner.dni).subscribe(vehicles => {
        this.vehicles = vehicles;
    });
  }

  protected showGeneralInformation() {
    this.currentView = 'generalInformation';
  }

  protected showInterventionSummary() {
    this.currentView = 'interventionSummary';
  }
}

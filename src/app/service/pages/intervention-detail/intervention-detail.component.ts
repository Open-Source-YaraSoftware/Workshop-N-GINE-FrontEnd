import {Component, inject, OnInit} from '@angular/core';
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
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {InterventionState} from "../../model/intervention-state.enum";
import {TaskService} from "../../services/task.service";
import {Task} from "../../model/task.entity";
import {InterventionSummaryComponent} from "../../components/intervention-summary/intervention-summary.component";

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
    GeneralInformationComponent,
    InterventionSummaryComponent
  ],
  templateUrl: './intervention-detail.component.html',
  styleUrl: './intervention-detail.component.css'
})
export class InterventionDetailComponent implements OnInit {

  //generalInformation
  private interventionService = inject(InterventionsService);
  private personnelService = inject(PersonnelService);
  private vehicleService = inject(VehicleService);
  private route = inject(ActivatedRoute);
  protected interventionId: string = '';
  protected currentView: 'generalInformation' | 'interventionSummary' | null = null;
  protected intervention: Intervention = new Intervention();
  protected mechanics: Mechanic[] = [];
  protected vehicles: Vehicle[] = [];
  protected isOwner: boolean = true;

  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  //interventionSummary
  private taskService = inject(TaskService);
  protected tasks: Task[] = [];


  ngOnInit(): void {
    this.loadInterventionId();
    this.loadPersonnelData();
    this.loadInterventionData();
    this.loadVehiclesData();
    this.loadTasksData();
  }

  loadAccordingRole() {
    // TODO: Implement this method
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

  protected updateIntervention(intervention: Intervention) {
    const stateAsEnum = InterventionState[this.intervention.state as unknown as keyof typeof InterventionState];

    if (stateAsEnum === InterventionState.PENDING) {
      this.showConfirmationDialog(intervention);
    } else {
      this.showSnackBar('Cannot update an intervention that is not in PENDING state.');
    }
  }

  private showConfirmationDialog(intervention: Intervention): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to update this intervention?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateInterventionData(intervention);
      }
    });
  }

  private updateInterventionData(intervention: Intervention): void {
    this.interventionService.update(this.interventionId, intervention).subscribe({
      next: updatedIntervention => {
        this.intervention = updatedIntervention;
      }
    });
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  //interventionSummary

  private loadTasksData() {
    this.taskService.getByInterventionId(parseInt(this.interventionId)).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

}

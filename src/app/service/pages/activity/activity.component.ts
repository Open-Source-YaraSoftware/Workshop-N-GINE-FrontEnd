import {Component, inject, signal, ViewChild} from '@angular/core';
import {
  MatStep,
  MatStepLabel,
  MatStepper,
  MatStepperIcon,
  MatStepperNext,
  MatStepperPrevious
} from "@angular/material/stepper";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ActivityInformationComponent} from "../../components/activity-information/activity-information.component";
import {
  ActivityDiagnosticPreparationComponent
} from "../../components/activity-diagnostic-preparation/activity-diagnostic-preparation.component";
import {ActivityExecutionComponent} from "../../components/activity-execution/activity-execution.component";
import {ActivityMonitoringComponent} from "../../components/activity-monitoring/activity-monitoring.component";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {NotificationMessagesService} from "../../../shared/services/notification-messages.service";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {InterventionsService} from "../../services/interventions.service";
import {Intervention} from "../../model/intervention.entity";
import {InterventionState} from "../../model/intervention-state.enum";

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    MatStepper,
    MatStep,
    MatStepLabel,
    MatButton,
    MatStepperNext,
    MatIcon,
    MatStepperIcon,
    MatStepperPrevious,
    ActivityInformationComponent,
    ActivityDiagnosticPreparationComponent,
    ActivityExecutionComponent,
    ActivityMonitoringComponent,
    NgIf
  ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {
  type: string = 'leader';
  @ViewChild('execution') execution!: ActivityExecutionComponent;
  @ViewChild('supervision') supervision!: ActivityMonitoringComponent;
  private confirmDialogRef = inject(MatDialog);
  private notificationMessagesService:NotificationMessagesService = inject(NotificationMessagesService);
  private interventionService: InterventionsService = inject(InterventionsService);
  protected intervention = signal<Intervention>(new Intervention());
  protected interventionId= signal(0);

  constructor(private route: ActivatedRoute) {
    this.searchQueryParams();
    this.searchParams();
    this.getIntervention();
  }

  private getIntervention() {
    this.interventionService.getById(this.interventionId())
      .subscribe((intervention: Intervention) => {
        this.intervention.set(intervention);
      });
  }

  protected onStepChange(event: any) {
    this.notify(event.selectedIndex);
  }

  private notify(step: number) {
    switch (step) {
      case 0: {
        return;
      }
      case 1: {
        return;
      }
      case 2: {
        this.execution.load();
        return;
      }
      case 3: {
        this.supervision.load();
        return;
      }
      default:
        return '';
    }
  }

  private searchParams() {
    this.route.params
      .subscribe(params => {
        this.interventionId.set(params['id'] || 0);
      });
  }

  private searchQueryParams() {
    this.route.queryParams
      .subscribe(params => {
        this.type = params['type'] || 'leader';
      });
  }

  protected onFinishIntervention() {
    const dialog = this.confirmDialogRef.open(ConfirmationDialogComponent, {  data: { message: 'Are you sure you want to update this?' } });
    dialog.componentInstance.confirm.subscribe(()=>this.finishIntervention());
  }

  private finishIntervention() {
    const intervention = this.intervention();
    intervention.state = InterventionState.COMPLETED;
    this.interventionService.update(intervention.id, intervention)
      .subscribe({
        next: () => {
          this.notificationMessagesService.openMessage('Intervention completed successfully',1 );
        },
        error: () => {
          this.notificationMessagesService.openMessage('Error completing intervention ', 3);
        }
      });
  }
}

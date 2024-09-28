import { Component } from '@angular/core';
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
import {ActivityInformationComponent} from "../../pages/activity-information/activity-information.component";
import {
  ActivityDiagnosticPreparationComponent
} from "../../pages/activity-diagnostic-preparation/activity-diagnostic-preparation.component";
import {ActivityExecutionHeaderComponent} from "../activity-execution-header/activity-execution-header.component";
import {ActivityMonitoringComponent} from "../../pages/activity-monitoring/activity-monitoring.component";

@Component({
  selector: 'app-activity-header',
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
    ActivityExecutionHeaderComponent,
    ActivityMonitoringComponent
  ],
  templateUrl: './activity-header.component.html',
  styleUrl: './activity-header.component.css'
})
export class ActivityHeaderComponent {

}

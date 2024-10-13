import {Component, ViewChild} from '@angular/core';
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
  @ViewChild('supervision') supervision!: ActivityMonitoringComponent;

  constructor(private route: ActivatedRoute) {
    this.searchQueryParams();
  }

  ngOnInit() {
    this.searchQueryParams();
  }

  protected onStepChange(event: any) {
    if(event.selectedIndex === 3) {
      this.supervision.load();
    }
  }

  private searchQueryParams() {
    this.route.queryParams
      .subscribe(params => {
        this.type = params['type'] || 'leader';
      });
  }
}

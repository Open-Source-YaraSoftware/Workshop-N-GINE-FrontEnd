import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {Task} from "../../model/task.entity";
import {TaskService} from "../../services/task.service";
import {MatButton} from "@angular/material/button";
import {ActivityRequestsComponent} from "../activity-requests/activity-requests.component";
import {ActivityTrackingComponent} from "../activity-tracking/activity-tracking.component";

@Component({
  selector: 'app-activity-execution-header',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButton,
    ActivityRequestsComponent,
    ActivityTrackingComponent
  ],
  templateUrl: './activity-execution-header.component.html',
  styleUrl: './activity-execution-header.component.css'
})
export class ActivityExecutionHeaderComponent {
  protected options = signal(['requests', 'tracking']);
  protected selectedOption = signal('requests');
  protected selectedTask = signal<Task>(new Task());
  protected interventionId= signal(0);
  protected tasks  = signal<Task[]>([]);
  private taskService: TaskService = inject(TaskService);

  constructor(private route: ActivatedRoute) {
    this.searchQueryParams();
    this.getTasksByInterventionId();
  }

  private searchQueryParams() {
    this.route.params
      .subscribe(params => {
        this.interventionId.set(params['id'] || 0);
      });
  }

  private getTasksByInterventionId() {
    this.taskService.getByInterventionId(this.interventionId())
      .subscribe((tasks: Task[]) => {
        this.tasks.set(tasks);
        this.selectedTask.set(this.tasks()[0]);
      });
  }

  protected onTaskSelected(task: Task) {
    this.selectedTask.set(task);
  }

  protected onOptionSelected(option: string) {
    this.selectedOption.set(option);
  }
}

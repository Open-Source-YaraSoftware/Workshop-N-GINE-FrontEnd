import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {Task} from "../../model/task.entity";
import {TaskService} from "../../services/task.service";
import {MatButton} from "@angular/material/button";
import {ActivityRequestsComponent} from "../activity-requests/activity-requests.component";
import {ActivityTrackingComponent} from "../activity-tracking/activity-tracking.component";
import {TaskState} from "../../model/task-state.enum";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {NotificationMessagesService} from "../../../shared/services/notification-messages.service";

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
  private confirmDialogRef = inject(MatDialog);
  private notificationMessagesService:NotificationMessagesService = inject(NotificationMessagesService);

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

  protected onFinishTask() {
    this.finishTask();
  }

  private finishTask() {
    const confirmDialog = this.confirmDialogRef.open(ConfirmationDialogComponent,{
      data: { message: 'Confirm completion? Lead mechanic will be notified, and changes may be limited.' }
    });
    confirmDialog.componentInstance.confirm.subscribe(() => {
      this.showMessage('Task completed successfully', 1);
      this.updateStateTask();
    });
  }

  private updateStateTask() {
    const currentTask = this.selectedTask();
    currentTask.state = TaskState.DONE;
    this.taskService.update(currentTask.id, currentTask)
      .subscribe(() => {
        this.nextTask();
      });
  }

  private nextTask() {
    const currentTask = this.selectedTask();
    const index = this.tasks().findIndex(task => task.id === currentTask.id);
    if (index === this.tasks().length - 1) return;
    this.selectedTask.set(this.tasks()[index + 1]);
  }

  private showMessage(message: string, level: number) {
    this.notificationMessagesService.openMessage(message, level);
  }
}

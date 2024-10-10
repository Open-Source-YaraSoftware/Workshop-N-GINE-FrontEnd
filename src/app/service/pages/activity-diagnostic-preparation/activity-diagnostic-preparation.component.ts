import {Component, inject, signal} from '@angular/core';
import {TaskDistributionComponent} from "../../components/task-distribution/task-distribution.component";
import {
  InterventionDiagnosticComponent
} from "../../components/intervention-diagnostic/intervention-diagnostic.component";
import {ActivatedRoute} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {Task} from "../../model/task.entity";
import {InterventionsService} from "../../services/interventions.service";
import {Intervention} from "../../model/intervention.entity";

@Component({
  selector: 'app-activity-diagnostic-preparation',
  standalone: true,
  imports: [
    TaskDistributionComponent,
    InterventionDiagnosticComponent
  ],
  templateUrl: './activity-diagnostic-preparation.component.html',
  styleUrl: './activity-diagnostic-preparation.component.css'
})
export class ActivityDiagnosticPreparationComponent {
  protected taskData!: Task;

  protected interventionId= signal(0);
  private taskService: TaskService = inject(TaskService);
  private interventionService: InterventionsService = inject(InterventionsService);
  protected tasks  = signal<Task[]>([]);
  protected interventionData = signal<Intervention>(new Intervention());

  constructor(private route: ActivatedRoute) {
    this.searchQueryParams();
    this.getInterventionById();
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
      });
  }

  private getInterventionById() {
    this.interventionService.getById(this.interventionId())
      .subscribe((intervention: Intervention) => {
        this.interventionData.set(intervention);
      });
  }

  protected onTaskAddRequested(item: Task) {
    this.taskData = item;
    this.createTask();
  }

  private createTask() {
    this.taskService.create(this.taskData)
      .subscribe((response: Task) => {
        this.taskData = response;
        this.tasks.set([...this.tasks(), this.taskData]);
      });
  }

  protected onTaskDeleteRequested(id: number) {
    this.deleteTask(id);
  }

  private deleteTask(id: number){
    this.taskService.delete(id)
      .subscribe((response: Task)=>{
        this.tasks.set(this.tasks().filter((task: Task) => task.id !== id));
      })
  }

  protected onTaskUpdateRequested(item: Task) {
    this.taskData = item;
    this.updateTask();
  }

  private updateTask() {
    this.taskService.update(this.taskData.id, this.taskData)
      .subscribe((response: Task) => {
        this.taskData = response;
        this.tasks.set(this.tasks().map((task: Task) => {
          if(task.id === this.taskData.id) {
            task = this.taskData;
          }
          return task;
        }));
      });
  }

  protected onInterventionUpdateRequested(item: Intervention) {
    this.interventionService.update(item.id, item)
      .subscribe((response: Intervention) => {
        console.log(response)
        this.interventionData.set(response);
      });
  }
}

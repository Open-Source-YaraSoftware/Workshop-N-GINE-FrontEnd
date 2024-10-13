import {Component, inject, signal, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TaskService} from "../../services/task.service";
import {Task} from "../../model/task.entity";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {TaskState} from "../../model/task-state.enum";
import {PersonnelService} from "../../services/personnel.service";
import {Mechanic} from "../../model/mechanic.entity";

@Component({
  selector: 'app-activity-monitoring',
  standalone: true,
  imports: [
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatSortHeader,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator
  ],
  templateUrl: './activity-monitoring.component.html',
  styleUrl: './activity-monitoring.component.css'
})
export class ActivityMonitoringComponent {
  private taskService: TaskService = inject(TaskService);
  private personnelService: PersonnelService = inject(PersonnelService);
  private route = inject(ActivatedRoute);
  private personnel = signal<Mechanic[]>([]);
  protected interventionId= signal(0);
  protected dataSource = new MatTableDataSource<Task>([]);
  protected displayedColumns: string[] = ['description', 'mechanic','state'];
  protected readonly TaskState = TaskState;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.getPersonnel();
    this.searchQueryParams();
  }

  public load(){
    this.getTasks();
  }

  private searchQueryParams() {
    this.route.params
      .subscribe(params => {
        this.interventionId.set(params['id'] || 0);
        this.getTasks();
      });
  }

  private getTasks() {
    this.taskService.getByInterventionId(this.interventionId())
      .subscribe(tasks => {
        this.dataSource.data = tasks;
        this.getTaskWithMechanicName();
      });
  }

  private getPersonnel() {
    this.personnelService.getAll()
      .subscribe(personnel => {
        this.personnel.set(personnel);
      });
  }

  private getTaskWithMechanicName() {
    this.dataSource.data = this.dataSource.data.map(task => {
      const mechanic = this.personnel().find(p => p.id === task.assistant.id);
      return {
        ...task,
        mechanic: mechanic ? `${mechanic.firstName} ${mechanic.lastName}` : 'Unknown'
      };
    });
  }
}

import {AfterViewInit, Component, inject, OnInit, signal, ViewChild} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {TaskService} from "../../services/task.service";
import {Task} from "../../model/task.entity";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatSortHeader,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatNoDataRow,
    MatPaginator,
    RouterLink,
    MatButton
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements AfterViewInit {
  dataSource!: MatTableDataSource<Task>;
  displayedColumns = signal(['id', 'description', 'state', 'interventionId', 'interventionType', 'interventionState']);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(){
    this.dataSource = new MatTableDataSource([] as Task[]);
    // TODO: Implement this by mechanic id dynamically
    this.taskService.getByMechanicId(1).subscribe((data: any) => {
      console.log(data)
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.updatedSortingAccessor();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  taskService = inject(TaskService);

  updatedSortingAccessor(){
    this.dataSource.sortingDataAccessor = (item: Task, property: string) => {
      switch (property) {
        case 'interventionId':
          return item.intervention ? item.intervention.id : '';
        case 'interventionType':
          return item.intervention ? item.intervention.type : '';
        case 'interventionState':
          return item.intervention ? item.intervention.state : '';
        default:
          return item[property as keyof Task] !== undefined ? String(item[property as keyof Task]) : '';
      }
    }
  }

}

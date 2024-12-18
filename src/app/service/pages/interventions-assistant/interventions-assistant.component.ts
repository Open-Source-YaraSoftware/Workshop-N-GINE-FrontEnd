import {AfterViewInit, Component, inject, ViewChild} from '@angular/core';
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
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import { map, Observable, switchMap} from "rxjs";
import {InterventionsService} from "../../services/interventions.service";
import {Intervention} from "../../model/intervention.entity";
import {Task} from "../../model/task.entity";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-interventions-assistant',
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
    MatButton,
    DatePipe
  ],
  templateUrl: './interventions-assistant.component.html',
  styleUrl: './interventions-assistant.component.css'
})
export class InterventionsAssistantComponent implements AfterViewInit {
  dataSource!: MatTableDataSource<Intervention>;
  displayedColumns: string[] = ['id', 'client', 'vehicle', 'date', 'type', 'status'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(){
    this.dataSource = new MatTableDataSource([] as Intervention[]);
    // TODO: Implement this by mechanic id dynamically
    //this.setupFilterPredicate();
    this.getInterventionForMechanicAssistant()
  }

  getInterventionIdFromTaskOfMechanicId(): Observable<any> {
    return this.taskService.getByMechanicId(1).pipe(
      map((data: any) => data.map((task: Task) => task.intervention.id))
    );
  }

  getInterventionForMechanicAssistant() {
    this.getInterventionIdFromTaskOfMechanicId()
      .pipe(
        switchMap((taskIds: any) => {
          return this.interventionService.getAll().pipe(
            map((interventions: any) => {
              return interventions.filter((intervention: any) => {
                return taskIds.includes(intervention.id) && intervention.leader.id !== 1;
              });
            })
          );
        })
      )
      .subscribe((filteredInterventions: Intervention[]) => {
        this.dataSource.data = filteredInterventions;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //this.updatedSortingAccessor();
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
  interventionService = inject(InterventionsService);

  /*updatedSortingAccessor() {
    this.dataSource.sortingDataAccessor = (item: Intervention, property: string) => {
      switch (property) {
        case 'client':
          return `${item.vehicle.owner.firstName} ${item.vehicle.owner.lastName}`;
        case 'vehicle':
          return item.vehicle.licensePlate;
        case 'date':
          return new Date(item.registrationDate);
        case 'type':
          return item.interventionType;
        case 'status':
          return item.state;
        default:
          return (item as any)[property];
      }
    };
  }*/
  /*setupFilterPredicate() {
    this.dataSource.filterPredicate = (data: Intervention, filter: string) => {
      const transformedFilter = filter.trim().toLowerCase();
      const combinedData = `
        ${data.id}
        ${data.vehicle.owner.firstName} ${data.vehicle.owner.lastName}
        ${data.vehicle.licensePlate}
        ${data.registrationDate}
        ${data.interventionType}
        ${data.state}
      `.toLowerCase();
      return combinedData.includes(transformedFilter);
    };
  }*/
}

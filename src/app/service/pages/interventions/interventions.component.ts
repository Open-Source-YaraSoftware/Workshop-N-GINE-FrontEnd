import { InterventionsService } from '../../services/interventions.service';
import { Intervention} from '../../model/intervention.entity';
import { InterventionState} from "../../model/intervention-state.enum";

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { NewInterventionDialogComponent } from "../../components/new-intervention-dialog/new-intervention-dialog.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {DatePipe, JsonPipe, NgClass} from "@angular/common";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {WorkshopService} from "../../services/workshop.service";
import {ProfileService} from "../../../profiles/services/profile.service";

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    DatePipe,
    NgClass,
    NewInterventionDialogComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    JsonPipe
  ]
})
export class InterventionsComponent implements  AfterViewInit {
  displayedColumns: string[] = ['clientFirstName', 'clientLastName', 'licensePlate', 'vehicleModel', 'scheduledAt', 'completedAt', 'state'];
  protected dataSource! : MatTableDataSource<Intervention>;
  selectedStatus = 'ALL';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private interventionsService: InterventionsService, private workshopService: WorkshopService, private profileService: ProfileService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource([] as Intervention[]);
    this.getInterventions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  filterByStatus(status: string): void {
    this.selectedStatus = status;
    this.dataSource.filterPredicate = (data: Intervention) => {
      if (status === 'ALL') return true;
      return data.status.toUpperCase() === status.toUpperCase();
    };
    this.dataSource.filter = status === 'ALL' ? '' : status.toUpperCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  isActiveFilter(status: string): boolean {
    return this.selectedStatus === status;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewInterventionDialogComponent, { autoFocus: true, width: '300px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.submitIntervention(result);
    });
  }

  submitIntervention(interventionData: any): void {
    const response = {
      ...interventionData,
      workshopId: 1,
    }
    const newIntervention = new Intervention(response);
    newIntervention.description = response.description;
    this.interventionsService.postIntervention(newIntervention).subscribe(() => this.getInterventions());
  }

  getInterventions(): void {
    this.workshopService.getAllInterventionsByWorkshopId(1).subscribe({
      next: (response: Intervention[]) => {
        this.dataSource.data = response;
      },
      error: error => console.error('Error fetching interventions:', error)
    });
  }
}

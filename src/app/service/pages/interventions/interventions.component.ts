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
import { DatePipe, NgClass } from "@angular/common";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
  ]
})
export class InterventionsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['clientFirstName', 'clientLastName', 'licensePlate', 'vehicleModel', 'registrationDate', 'completionDate', 'state'];
  dataSource = new MatTableDataSource<Intervention>();
  selectedStatus = 'ALL';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private interventionsService: InterventionsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getInterventions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (data: Intervention, sortHeaderId: string): string | number => {
      switch (sortHeaderId) {
        case 'clientFirstName': return data.vehicle?.owner?.firstName?.toLowerCase() || '';
        case 'clientLastName': return data.vehicle?.owner?.lastName?.toLowerCase() || '';
        case 'licensePlate': return data.vehicle?.licensePlate?.toLowerCase() || '';
        case 'vehicleModel': return data.vehicle?.model?.toLowerCase() || '';
        case 'registrationDate': return data.registrationDate ? new Date(data.registrationDate).getTime() : 0;
        case 'completionDate': return data.completionDate ? new Date(data.completionDate).getTime() : 0;
        case 'state': return mapStateToString(data.state);
        default: return '';
      }
    };

    this.dataSource.filterPredicate = (data: Intervention, filter: string) => {
      const normalizedFilter = filter.trim().toLowerCase();
      const clientFullName = `${data.vehicle.owner.firstName} ${data.vehicle.owner.lastName}`.toLowerCase();
      const vehicleInfo = `${data.vehicle.licensePlate} ${data.vehicle.model}`.toLowerCase();
      const stateString = mapStateToString(data.state).toLowerCase();
      const dataString = `${clientFullName} ${vehicleInfo} ${stateString}`.toLowerCase();
      return dataString.includes(normalizedFilter);
    };
  }

  filterByStatus(status: string): void {
    this.selectedStatus = status;
    this.dataSource.filterPredicate = (data: Intervention) => {
      if (status === 'ALL') return true;
      return mapStateToString(data.state).toUpperCase() === status.toUpperCase();
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
    this.interventionsService.postIntervention(interventionData).subscribe(() => this.getInterventions());
  }

  getInterventions(): void {
    this.interventionsService.getAllInterventions().subscribe({
      next: (response: Intervention[]) => {
        response.forEach(intervention => intervention.state = mapStateFromString(intervention.state as unknown as string));
        this.dataSource.data = response;
      },
      error: error => console.error('Error fetching interventions:', error)
    });
  }

  protected readonly mapStateToString = mapStateToString;
}

function mapStateToString(state: InterventionState): string {
  switch (state) {
    case InterventionState.PENDING: return 'PENDING';
    case InterventionState.IN_PROGRESS: return 'IN_PROGRESS';
    case InterventionState.COMPLETED: return 'COMPLETED';
    default: return 'UNKNOWN';
  }
}

function mapStateFromString(state: string): InterventionState {
  switch (state.toUpperCase()) {
    case 'PENDING': return InterventionState.PENDING;
    case 'IN_PROGRESS': return InterventionState.IN_PROGRESS;
    case 'COMPLETED': return InterventionState.COMPLETED;
    default: throw new Error(`Invalid state: ${state}`);
  }
}

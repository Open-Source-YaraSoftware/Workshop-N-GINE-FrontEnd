import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.css'],
})
export class InterventionsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['clientFirstName', 'clientLastName', 'licensePlate', 'vehicleModel', 'registrationDate', 'completionDate', 'state'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
      switch (sortHeaderId) {
        case 'clientFirstName': return data.clientFirstName.toLowerCase();
        case 'clientLastName': return data.clientLastName.toLowerCase();
        case 'licensePlate': return data.licensePlate.toLowerCase();
        case 'vehicleModel': return data.vehicleModel.toLowerCase();
        case 'registrationDate': return new Date(data.registrationDate).getTime();
        case 'completionDate': return new Date(data.completionDate).getTime();
        default: return '';
      }
    };
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
}


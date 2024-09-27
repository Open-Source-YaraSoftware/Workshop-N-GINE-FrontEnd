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

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    // Placeholder for future data fetch
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}

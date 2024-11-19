import {Component, inject, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatNoDataRow,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {RouterLink} from "@angular/router";
import {WorkshopClient} from "../../model/workshop-client.entity";
import {WorkshopClientService} from "../../services/workshop-client.service";
import {MatDialog} from "@angular/material/dialog";
import {NewClientDialogComponent} from "../../components/new-client-dialog/new-client-dialog.component";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    MatButton,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatInput,
    MatLabel,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    RouterLink,
    MatHeaderCellDef,
    MatNoDataRow,
    NewClientDialogComponent
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  dataSource!: MatTableDataSource<WorkshopClient>;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dni', 'email'];

  workshopClientService: WorkshopClientService = inject(WorkshopClientService);
  dialog: MatDialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(){
    this.dataSource = new MatTableDataSource([] as WorkshopClient[]);
    this.getClientsByWorkshop();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getClientsByWorkshop() {
    this.workshopClientService.getByWorkshopId(1)
      .subscribe((clients: WorkshopClient[]) => {
        this.dataSource.data = clients;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  openNewClientDialog(): void {
    this.dialog.open(NewClientDialogComponent, {
      width: '400px'
    });
  }
}

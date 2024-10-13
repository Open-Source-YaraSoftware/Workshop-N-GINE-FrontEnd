import {Component, inject, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {ProductRequest} from "../../model/product-request.entity";
import {ProductRequestService} from "../../services/product-request.service";
import {SelectionModel} from "@angular/cdk/collections";
import {MatCheckbox} from "@angular/material/checkbox";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatTable,
    MatHeaderCellDef,
    MatCheckbox,
    MatButton
  ],
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.css'
})
export class RequestsComponent {

  protected requestData!: MatTableDataSource<ProductRequest>;
  private requestService: ProductRequestService = inject(ProductRequestService);
  protected displayedColumns: string[] = ['select', 'name', 'amount', 'mechanic', 'date', 'observation'];
  protected dialog: MatDialog = inject(MatDialog);

  protected selection = new SelectionModel<ProductRequest>(true, []);


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.requestData = new MatTableDataSource([] as ProductRequest[]);
    this.getRequestsByWorkshop();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.requestData.data.length;
    return numSelected == numRows;
  }

  toggleAllRequests() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.requestData.data.forEach(row => this.selection.select(row));
  }

  getRequestsByWorkshop() {
    this.requestService.getByWorkshopId(1)
      .subscribe((requests: ProductRequest[]) => {
        this.requestData.data = requests;
        this.requestData.paginator=this.paginator;
        this.requestData.sort = this.sort;
      });
  }

  updateRequest(status: String): void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `Pressing 'Confirm' means you acknowledge that the item request has been ${status} ` }
    });
    dialogRef.componentInstance.confirm.subscribe(()=>{
      if (this.selection.hasValue()) {
        this.requestService.updateRequests(this.selection.selected, status).subscribe({
          next: () => console.log(`Success updating request to ${status}`),
          error: err => console.error(`Error updating request to ${status}`, err),
          complete: () => {
            this.requestData.data = this.requestData.data.filter(item => !this.selection.selected.includes(item));
            this.selection.clear();
            this.requestData._updateChangeSubscription();
            console.log(`All selected requests have been ${status}`);
          }
        });
      }
    })
  }




}

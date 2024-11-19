import {Component, inject, ViewChild} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {ProductStock} from "../../model/product-stock.entity";
import {ProductStockService} from "../../services/product-stock.service";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {EditItemDialogComponent} from "../../components/edit-item-dialog/edit-item-dialog.component";
import {
  ConfirmationDialogComponent
} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatPaginator,
    MatSortHeader,
    MatButton,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent {
  protected itemData! : MatTableDataSource<ProductStock>;
  private itemService: ProductStockService = inject(ProductStockService);
  protected dialog: MatDialog = inject(MatDialog);

  protected displayedColumns: string[] = ['name', 'type', 'amount', 'limit', 'delete', 'edit'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.itemData = new MatTableDataSource([] as ProductStock[]);
    this.getItemsByWorkshop();
  }

  getItemsByWorkshop() {
    this.itemService.getByWorkshopId(1)
      .subscribe((items: ProductStock[]) => {
        this.itemData.data = items;
        this.itemData.paginator=this.paginator;
        this.itemData.sort = this.sort;
      });
  }

  delete(element: ProductStock): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Pressing \'Confirm\' will delete the item information' }
    });
    dialogRef.componentInstance.confirm.subscribe(() => {
      this.itemService.deleteItem(element).subscribe(
        () => {
          console.log('Producto eliminado con éxito', element);
          this.itemData.data = this.itemData.data.filter(item => item.id !== element.id);
          this.itemData._updateChangeSubscription();
        });
    });
  }

  edit(element: ProductStock): void{
    const dialogRef = this.dialog.open(EditItemDialogComponent, {data: element});
    dialogRef.afterClosed().subscribe(updatedItem => {
      if (updatedItem) {
        this.itemService.editItem(updatedItem).subscribe(
          () => {console.log('Producto actualizado con éxito', updatedItem);});
      }
    });
  }

}

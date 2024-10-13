import {Component, EventEmitter, Input, Output, SimpleChanges, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {ProductStock} from "../../model/product-stock.entity";
import {TaskProductUsage} from "../../model/task-product-usage.entity";

@Component({
  selector: 'app-task-product-stock-list',
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
    MatHeaderCellDef
  ],
  templateUrl: './task-product-stock-list.component.html',
  styleUrl: './task-product-stock-list.component.css'
})
export class TaskProductStockListComponent {
  @Input() taskProductsUsage!: TaskProductUsage[];
  @Input() isEditMode!: boolean;
  @Input() productsStock!: ProductStock[];
  @Output() taskProductUsageDeleteRequested = new EventEmitter<number>();
  @Output() taskProductUsageEditRequested = new EventEmitter<TaskProductUsage>();

  protected dataSource = new MatTableDataSource<TaskProductUsage>([]);
  protected displayedColumnsTaskProductUsage: string[] = ['partName', 'quantityUsed', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskProductsUsage'] && this.taskProductsUsage) {
      this.dataSource.data = this.taskProductsUsage.map(taskProductUsage => {
        const product = this.productsStock.find(p => p.id === taskProductUsage.productStockId);
        return {
          ...taskProductUsage,
          partName: product ? product.name : 'Unknown'
        };
      });
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  protected onDeleteTaskProductsUsage(id: number) {
    this.taskProductUsageDeleteRequested.emit(id);
  }

  protected onEditTaskProductsUsage(data: TaskProductUsage) {
    this.taskProductUsageEditRequested.emit(data);
  }

  protected searchProductStockById(id: number) {
    return this.productsStock.find(productStock => productStock.id === id);
  }
}

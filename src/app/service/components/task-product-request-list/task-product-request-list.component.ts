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
import {ProductRequest} from "../../model/product-request.entity";
import {ProductRequestState} from "../../model/product-request-state.enum";

@Component({
  selector: 'app-task-product-request-list',
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
  templateUrl: './task-product-request-list.component.html',
  styleUrl: './task-product-request-list.component.css'
})
export class TaskProductRequestListComponent {
  @Input() productsRequested!: ProductRequest[];
  @Input() isEditMode!: boolean;
  @Output() productRequestDeleteRequested = new EventEmitter<number>();
  @Output() productRequestEditRequested = new EventEmitter<ProductRequest>();
  protected dataSource!: MatTableDataSource<ProductRequest>;
  protected displayedColumnsProductRequest: string[] = ['name', 'requestedQuantity', 'observation', 'status', 'actions'];
  protected readonly ProductRequestState = ProductRequestState;

  constructor() {
    this.dataSource = new MatTableDataSource(this.productsRequested);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productsRequested']) {
      this.dataSource = new MatTableDataSource(this.productsRequested);
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  protected onDeleteProductRequest(id: number) {
    this.productRequestDeleteRequested.emit(id);
  }

  protected onEditProductRequest(data: ProductRequest) {
    this.productRequestEditRequested.emit(data);
  }
}

import {Component, computed, inject, Input, signal, SimpleChanges} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {ProductStock} from "../../model/product-stock.entity";
import {ProductStockService} from "../../services/product-stock.service";
import {ProductRequestService} from "../../services/product-request.service";
import {TaskProductUsageService} from "../../services/task-product-usage.service";
import {ProductRequest} from "../../model/product-request.entity";
import {TaskProductUsage} from "../../model/task-product-usage.entity";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-activity-requests',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatIcon,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatSortHeader,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatNoDataRow,
    MatRowDef,
    MatHeaderRowDef,
    MatPaginator
  ],
  templateUrl: './activity-requests.component.html',
  styleUrl: './activity-requests.component.css'
})
export class ActivityRequestsComponent {
  @Input() interventionId!: number;
  @Input() taskSelectedId!: number;
  protected requestsForm = new FormGroup({
    requiredPart: new FormControl(-1, Validators.required),
    otherPart: new FormControl(''),
    observation: new FormControl(''),
    quantity: new FormControl(0, [
      Validators.min(1),
      Validators.required
    ])
  });
  protected productsStock = signal<ProductStock[]>([]);
  protected requiredPartSelected = signal<number | null>(null);
  protected productStockSelected = signal<ProductStock | null>(null);
  protected productsRequested = signal<ProductRequest[]>([]);
  protected taskProductsUsage = signal<TaskProductUsage[]>([]);
  protected taskProductsUsageCompletedInformation = computed(()=>{
    return this.taskProductsUsage().map(taskProductUsage=>{
      return {
        ...taskProductUsage,
        productStock: this.productsStock().find(productStock=>productStock.id === taskProductUsage.productStockId)
      };
    });
  });
  protected options = signal(['Products Stock', 'Products Requested']);
  protected selectedOption = signal('');
  private productStockService: ProductStockService = inject(ProductStockService);
  private productRequestService: ProductRequestService = inject(ProductRequestService);
  private taskProductsUsageService: TaskProductUsageService = inject(TaskProductUsageService);
  protected displayedColumnsProductRequest: string[] = ['part', 'quantity', 'observation', 'status', 'actions'];
  protected displayedColumnsTaskProductUsage: string[] = ['part', 'quantity', 'actions'];
  protected isEditMode = signal(false);
  protected taskProductUsageSelected = signal<TaskProductUsage>(new TaskProductUsage());
  protected productRequestSelected = signal<ProductRequest>(new ProductRequest());

  constructor() {
    this.getProductsStock();
    this.detectRequiredPartSelected();
    this.selectedOption.set(this.options()[0]);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskSelectedId'] && !changes['taskSelectedId'].isFirstChange()) {
      this.getTaskProductsUsage();
      this.getProductsRequested();
    }
  }

  private getProductsStock() {
    this.productStockService.getAll()
      .subscribe(productsStock=>{
        this.productsStock.set(productsStock);
      });
  }

  private getTaskProductsUsage() {
    this.taskProductsUsageService.getAllByTaskId(this.taskSelectedId)
      .subscribe(taskProductsUsage=>{
        this.taskProductsUsage.set(taskProductsUsage);
      });
  }

  private getProductsRequested() {
    this.productRequestService.getAllByTaskId(this.taskSelectedId)
      .subscribe(productsRequested=>{
        this.productsRequested.set(productsRequested);
      });
  }

  private detectRequiredPartSelected() {
    this.requestsForm.get('requiredPart')?.valueChanges
      .subscribe((value)=>{
        value? this.requiredPartSelected.set(Number(value)): this.requiredPartSelected.set(-1);
        this.productStockSelected.set(this.productsStock().find(productStock=>productStock.id === Number(value)) || null);
      });
  }

  protected onSubmit() {
    if(this.requestsForm.invalid) return;
    if(this.isEditMode()) {
      this.updateProduct();
    } else{
      this.addProduct();
    }
  }

  private addProduct(){
    if (this.requiredPartSelected() !== null && this.requiredPartSelected() !== -1){
      this.addTaskProductUsage();
    } else {
      this.addProductRequest();
    }
    this.resetForm();
  }

  private addProductRequest() {
    const productRequest = new ProductRequest();
    productRequest.taskId = this.taskSelectedId;
    const otherPartValue = this.requestsForm.get('otherPart')?.value;
    if(!otherPartValue) return;
    productRequest.name = otherPartValue;
    const observationValue = this.requestsForm.get('observation')?.value;
    productRequest.observation = observationValue? observationValue: '';
    productRequest.requestedQuantity = Number(this.requestsForm.get('quantity')?.value);
    this.productRequestService.create(productRequest)
      .subscribe(()=>{
        this.getProductsRequested();
      });
  }

  private addTaskProductUsage() {
    const taskProductUsage = new TaskProductUsage();
    taskProductUsage.taskId = this.taskSelectedId;
    taskProductUsage.productStockId = Number(this.requestsForm.get('requiredPart')?.value);
    taskProductUsage.quantityUsed = Number(this.requestsForm.get('quantity')?.value);
    this.taskProductsUsageService.create(taskProductUsage)
      .subscribe((res)=>{
        console.log(res);
        this.getTaskProductsUsage();
      });
  }

  protected onOptionSelected(option: string) {
    this.selectedOption.set(option);
  }

  protected onDeleteProductRequest(productRequestId: number) {
    this.deleteProductRequest(productRequestId);
  }

  private deleteProductRequest(productRequestId: number) {
    console.log(productRequestId);
    this.productRequestService.delete(productRequestId)
      .subscribe(()=>{
        this.getProductsRequested();
      });
  }

  protected onDeleteTaskProductUsage(taskProductUsageId: number) {
    this.deleteTaskProductUsage(taskProductUsageId);
  }

  private deleteTaskProductUsage(taskProductUsageId: number) {
    this.taskProductsUsageService.delete(taskProductUsageId)
      .subscribe(()=>{
        this.getTaskProductsUsage();
      });
  }

  protected onEditTaskProductUsage(taskProductUsage: TaskProductUsage) {
    this.isEditMode.set(true);
    this.editTaskProductUsage(taskProductUsage);
  }

  private editTaskProductUsage(taskProductUsage: TaskProductUsage) {
    this.taskProductUsageSelected.set(taskProductUsage);
    const productStock = this.productsStock().find(productStock=>productStock.id === taskProductUsage.productStockId);
    if (productStock) this.requestsForm.get('requiredPart')?.setValue(productStock.id);
    this.requestsForm.get('quantity')?.setValue(taskProductUsage.quantityUsed);
  }

  protected onEditProductRequest(productRequest: ProductRequest) {
    this.isEditMode.set(true);
    this.editProductRequest(productRequest);
  }

  private editProductRequest(productRequest: ProductRequest) {
    this.productRequestSelected.set(productRequest);
    this.requestsForm.get('requiredPart')?.setValue(0);
    this.requestsForm.get('otherPart')?.setValue(productRequest.name);
    this.requestsForm.get('observation')?.setValue(productRequest.observation);
    this.requestsForm.get('quantity')?.setValue(productRequest.requestedQuantity);
  }

  protected onCancelRequest() {
    this.isEditMode.set(false);
    this.resetForm();
  }

  private updateProduct(){
    if (this.requiredPartSelected() !== null && this.requiredPartSelected() !== -1){
      this.updateTaskProductUsage();
    } else {
      this.updateProductRequest();
    }
    this.isEditMode.set(false);
    this.resetForm();
  }

  private updateTaskProductUsage() {
    const taskProductUsage = this.taskProductUsageSelected();
    taskProductUsage.quantityUsed = Number(this.requestsForm.get('quantity')?.value);
    taskProductUsage.productStockId = Number(this.requestsForm.get('requiredPart')?.value);
    taskProductUsage.dateUsed = new Date();
    this.taskProductsUsageService.update(taskProductUsage.id, taskProductUsage)
      .subscribe(()=>{
        this.getTaskProductsUsage();
      });
  }

  private updateProductRequest() {
    const productRequest = this.productRequestSelected();
    const otherPartValue = this.requestsForm.get('otherPart')?.value;
    if(otherPartValue) productRequest.name = otherPartValue;
    const observationValue = this.requestsForm.get('observation')?.value;
    if(observationValue) productRequest.observation = observationValue;
    productRequest.requestedQuantity = Number(this.requestsForm.get('quantity')?.value);
    productRequest.requestedDate = new Date();
    this.productRequestService.update(productRequest.id, productRequest)
      .subscribe(()=>{
        this.getProductsRequested();
      });
  }

  private resetForm() {
    this.requestsForm.reset();
    this.requiredPartSelected.set(0);
  }
}

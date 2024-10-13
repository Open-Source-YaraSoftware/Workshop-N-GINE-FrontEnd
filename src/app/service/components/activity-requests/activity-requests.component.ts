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
import {TaskProductStockListComponent} from "../task-product-stock-list/task-product-stock-list.component";
import {TaskProductRequestListComponent} from "../task-product-request-list/task-product-request-list.component";
import {MatDialog} from "@angular/material/dialog";
import {NotificationMessagesService} from "../../../shared/services/notification-messages.service";
import {ConfirmationDialogComponent} from "../../../shared/components/confirmation-dialog/confirmation-dialog.component";

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
    MatIconButton,
    TaskProductStockListComponent,
    TaskProductRequestListComponent
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
  protected isEditMode = signal(false);
  protected taskProductUsageSelected = signal<TaskProductUsage>(new TaskProductUsage());
  protected productRequestSelected = signal<ProductRequest>(new ProductRequest());
  private confirmDialogRef = inject(MatDialog);
  private notificationMessagesService:NotificationMessagesService = inject(NotificationMessagesService);

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
      const dialog = this.confirmDialogRef.open(ConfirmationDialogComponent, {  data: { message: 'Are you sure you want to update this?' } });
      dialog.componentInstance.confirm.subscribe(()=>this.updateProduct());
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
      .subscribe({
        next: ()=>{
          this.getProductsRequested();
          this.showMessage('Product request added successfully', 1);
        },
        error: ()=>{
          this.showMessage('Error adding product request', 3);
        }
      });
  }

  private addTaskProductUsage() {
    const taskProductUsage = new TaskProductUsage();
    taskProductUsage.taskId = this.taskSelectedId;
    taskProductUsage.productStockId = Number(this.requestsForm.get('requiredPart')?.value);
    taskProductUsage.quantityUsed = Number(this.requestsForm.get('quantity')?.value);
    this.taskProductsUsageService.create(taskProductUsage)
      .subscribe({
        next: ()=>{
          this.getTaskProductsUsage();
          this.showMessage('Task product usage added successfully', 1);
        },
        error: ()=>{
          this.showMessage('Error adding task product usage', 3);
        }
  });
  }

  protected onOptionSelected(option: string) {
    this.selectedOption.set(option);
  }

  protected onDeleteProductRequest(productRequestId: number) {
    const confirmDialog = this.confirmDialogRef.open(ConfirmationDialogComponent,{data: { message: 'Are you sure you want to delete this?' }});
    confirmDialog.componentInstance.confirm.subscribe( ()=>this.deleteProductRequest(productRequestId));
  }

  private deleteProductRequest(productRequestId: number) {
    this.productRequestService.delete(productRequestId)
      .subscribe({
        next: ()=>{
          this.getProductsRequested();
          this.showMessage('Product request deleted successfully', 1);
        },
        error: ()=>{
          this.showMessage('Error deleting product request', 3);
        }
      });
  }

  protected onDeleteTaskProductUsage(taskProductUsageId: number) {
    const confirmDialog = this.confirmDialogRef.open(ConfirmationDialogComponent,{data: { message: 'Are you sure you want to delete this?' }});
    confirmDialog.componentInstance.confirm.subscribe( ()=>this.deleteTaskProductUsage(taskProductUsageId));
  }

  private deleteTaskProductUsage(taskProductUsageId: number) {
    this.taskProductsUsageService.delete(taskProductUsageId)
      .subscribe({
        next: ()=>{
          this.getTaskProductsUsage();
          this.showMessage('Task product usage deleted successfully', 1);
        },
        error: ()=>{
          this.showMessage('Error deleting task product usage', 3);
        }
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
      .subscribe({
        next: ()=>{
          this.getTaskProductsUsage();
          this.showMessage('Task product usage updated successfully', 1);
        },
        error: ()=>{
          this.showMessage('Error updating task product usage', 3);
        }
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
      .subscribe({
        next: ()=>{
          this.getProductsRequested();
          this.showMessage('Product request updated successfully', 1);
        },
        error: ()=>{
          this.showMessage('Error updating product request', 3);
        }
      });
  }

  private resetForm() {
    this.requestsForm.reset();
    this.requiredPartSelected.set(0);
  }

  private showMessage(message: string, level: number) {
    this.notificationMessagesService.openMessage(message, level);
  }
}

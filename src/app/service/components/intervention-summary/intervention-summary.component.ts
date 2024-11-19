import { Component, inject, Input, OnInit } from '@angular/core';
import { Task } from "../../model/task.entity";
import { Intervention } from "../../model/intervention.entity";
import { DatePipe, NgForOf } from "@angular/common";
import { TaskDetailComponent } from "../task-detail/task-detail.component";
import { Checkpoint } from "../../model/checkpoint.entity";
import { CheckpointService } from "../../services/checkpoint.service";
import { TaskProductUsage } from "../../model/task-product-usage.entity";
import { ProductStock } from "../../model/product-stock.entity";
import { TaskProductUsageService } from "../../services/task-product-usage.service";
import { ProductStockService } from "../../services/product-stock.service";

@Component({
  selector: 'app-intervention-summary',
  standalone: true,
  imports: [
    DatePipe,
    TaskDetailComponent,
    NgForOf
  ],
  templateUrl: './intervention-summary.component.html',
  styleUrl: './intervention-summary.component.css'
})
export class InterventionSummaryComponent implements OnInit {
  @Input() intervention!: Intervention;
  @Input() tasks!: Task[];

  private checkpointService = inject(CheckpointService);
  private taskProductUsageService = inject(TaskProductUsageService); //getAllByTaskId
  private productStockService = inject(ProductStockService); //getById

  protected checkpointsMap: { [taskId: number]: Checkpoint[] } = {};
  protected taskProductUsagesMap: { [taskId: number]: TaskProductUsage[] } = {};
  protected productStocksMap: { [productStockId: number]: ProductStock } = {};

  ngOnInit(): void {
    this.loadCheckpointsForTasks();
    this.loadProductUsagesForTasks();
  }

  private loadCheckpointsForTasks(): void {
    this.tasks.forEach(task => {
      this.checkpointService.getAllByTaskId(task.id).subscribe(
        data => {
          this.checkpointsMap[task.id] = data;
        });
    });
  }

  private loadProductUsagesForTasks(): void {
    this.tasks.forEach(task => {
      this.taskProductUsageService.getAllByTaskId(task.id).subscribe(usages => {
        this.taskProductUsagesMap[task.id] = usages;
        usages.forEach(usage => {
          this.productStockService.getById(usage.productStockId).subscribe(productStock => {
            this.productStocksMap[usage.productStockId] = productStock;
          });
        });
      });
    });
  }

  protected getCheckpoints(taskId: number): Checkpoint[] {
    return this.checkpointsMap[taskId] || [];
  }

  protected getProductUsages(taskId: number): { usage: TaskProductUsage, stock: ProductStock }[] {
    const usages = this.taskProductUsagesMap[taskId] || [];
    return usages.map(usage => ({
      usage,
      stock: this.productStocksMap[usage.productStockId]
    }));
  }
}

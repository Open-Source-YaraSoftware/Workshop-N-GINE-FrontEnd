export class TaskProductUsage{
  id: number;
  taskId: number;
  productStockId: number;
  quantityUsed: number;
  dateUsed: Date;

  constructor({
                id = 0,
                taskId = 0,
                productStockId = 0,
                quantityUsed = 0,
                dateUsed = ''
              }={}) {
    this.id = id;
    this.taskId = taskId;
    this.productStockId = productStockId;
    this.quantityUsed = quantityUsed;
    this.dateUsed = dateUsed? new Date(dateUsed): new Date();
  }
}

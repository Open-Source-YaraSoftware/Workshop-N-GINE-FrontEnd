export class ProductStock {
  id: number;
  name: string;
  stockQuantity: number;
  workshopId: number;
  description: string;
  lowStockThreshold: number;

  constructor({
                id = 0,
                name = '',
                stockQuantity = 0,
                workshopId = 0,
                description = '',
                lowStockThreshold = 0,
              }={}) {
    this.id = id;
    this.name = name;
    this.stockQuantity = stockQuantity;
    this.workshopId = workshopId;
    this.description = description;
    this.lowStockThreshold = lowStockThreshold;
  }
}

export class Vehicle {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  clientId: number;
  image: string;
  iotDeviceId: number;
  constructor({
    id = 0,
    licensePlate = '',
    brand = '',
    model = '',
    clientId = 0,
    image = '',
    iotDeviceId = 0
              }={}) {
    this.id = id;
    this.licensePlate = licensePlate;
    this.brand = brand;
    this.model = model;
    this.clientId = clientId;
    this.image = image;
    this.iotDeviceId = iotDeviceId;
  }

  get fullName(): string {
    return `${this.brand} ${this.model}`;
  }
}

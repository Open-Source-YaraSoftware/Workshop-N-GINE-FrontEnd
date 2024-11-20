export class Intervention {
  id: number;
  workshopId: number;
  mechanicLeaderId: number;
  vehicleId: number;
  clientId: number;
  scheduledAt: Date;
  startedAt: Date | null;
  finishedAt: Date | null;
  type: string;
  status: string;
  description: string;

  constructor({
    id = 0,
    workshopId = 0,
    mechanicLeaderId = 0,
    vehicleId = 0,
    clientId = 0,
    scheduledAt = '',
    finishedAt = '',
    startedAt = '',
    type = '',
    status = '',
    Description = ''
              }={}
  ) {
    this.id = id;
    this.workshopId = workshopId;
    this.mechanicLeaderId = mechanicLeaderId;
    this.vehicleId = vehicleId;
    this.clientId = clientId;
    this.scheduledAt = new Date(scheduledAt);
    this.startedAt = startedAt ? new Date(startedAt) : null;
    this.finishedAt = finishedAt ? new Date(finishedAt) : null;
    this.type = type;
    this.status = status;
    this.description = Description;
  }
}

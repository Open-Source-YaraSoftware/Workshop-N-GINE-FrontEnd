import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkshopClientService } from '../../services/workshop-client.service';
import { VehicleService } from '../../services/vehicle.service';
import { WorkshopClient } from '../../model/workshop-client.entity';
import { Vehicle } from '../../../service/model/vehicle.entity';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { NewVehicleDialogComponent } from "../../components/new-vehicle-dialog/new-vehicle-dialog.component";
import {VehicleItemComponent} from "../../components/vehicle-item/vehicle-item.component";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [
    VehicleItemComponent,
    MatLabel,
    MatFormField,
    FormsModule,
    MatInput,
    MatSelect,
    MatOption,
    MatIcon,
    MatIconButton,
    MatButton,
    NgForOf,
    // Angular Material and other imports
  ],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css'
})
export class ClientDetailComponent {
  private workshopClientService = inject(WorkshopClientService);
  private vehicleService = inject(VehicleService);

  protected clientId: number = 0;
  protected workshopClient: WorkshopClient = new WorkshopClient();
  protected vehicles: Vehicle[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.initializeComponent();
  }

  private initializeComponent() {
    this.loadClientIdFromRoute();
    this.loadClientData();
    this.loadVehiclesData();
  }

  private loadClientIdFromRoute() {
    this.route.params.subscribe(params => {
      this.clientId = params['id'] || 0;
    });
  }

  private loadClientData() {
    if (this.clientId) {
      this.workshopClientService.getById(this.clientId).subscribe(
        (client: WorkshopClient) => this.workshopClient = client
      );
    }
  }

  private loadVehiclesData() {
    this.vehicleService.getByClientId(this.clientId).subscribe(
      (vehicles: Vehicle[]) => this.vehicles = vehicles
    );
  }

  protected updateClient() {
    this.openConfirmationDialog('Are you sure you want to update this client?')
      .subscribe(() => this.workshopClientService.update(this.clientId, this.workshopClient)
        .subscribe(() => this.loadClientData())
      );
  }

  protected deleteClient() {
    this.openConfirmationDialog('Are you sure you want to delete this client?')
      .subscribe(() => this.workshopClientService.delete(this.clientId)
        .subscribe(() => this.router.navigate(['/clients']))
      );
  }

  protected startVehicleRegistration() {
    const dialogRef = this.dialog.open(NewVehicleDialogComponent, {
      width: '300px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.registerNewVehicle(result);
      }
    });
  }

  private registerNewVehicle(newVehicle: Vehicle) {
    newVehicle.owner = this.workshopClient;
    this.vehicleService.create(newVehicle).subscribe(() => {
      this.loadVehiclesData();
    });
  }

  private openConfirmationDialog(message: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message }
    });

    return dialogRef.componentInstance.confirm;
  }

  protected viewVehicleDetail(vehicle: Vehicle) {
    this.router.navigate([`/vehicles`, vehicle.id]);
  }
}

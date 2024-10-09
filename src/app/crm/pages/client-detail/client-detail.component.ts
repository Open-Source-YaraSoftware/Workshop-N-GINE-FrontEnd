import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import { WorkshopClientService } from '../../services/workshop-client.service';
import { VehicleService } from '../../services/vehicle.service';
import { WorkshopClient } from '../../model/workshop-client.entity';
import { Vehicle } from '../../../service/model/vehicle.entity';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatFormField } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import { VehicleItemComponent } from "../../components/vehicle-item/vehicle-item.component";
import { NgForOf } from "@angular/common";
import { MatInput, MatLabel } from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import { FormsModule } from '@angular/forms';
import {NewVehicleDialogComponent} from "../../components/new-vehicle-dialog/new-vehicle-dialog.component";

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatIcon,
    MatIconModule,
    VehicleItemComponent,
    NgForOf,
    MatInput,
    MatLabel,
    MatButton,
    FormsModule,
    MatIconButton
  ],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css'
})
export class ClientDetailComponent {
  private workshopClientService: WorkshopClientService = inject(WorkshopClientService);
  protected vehicleService: VehicleService = inject(VehicleService);
  protected clientId: number = 0;
  protected workshopClient: WorkshopClient = new WorkshopClient();
  protected vehicles: Vehicle[] = [];

  constructor(private router : Router, private route: ActivatedRoute, private dialog: MatDialog) {
    this.loadClientIdFromRoute();
    this.loadClientData();
    this.loadVehiclesData();
  };

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
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.registerNewVehicle(result);
      }
    });
  }

  private registerNewVehicle(newVehicle: Vehicle) {
    newVehicle.owner.id = this.workshopClient.id;
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
    // Implement vehicle detail logic here
  }
}

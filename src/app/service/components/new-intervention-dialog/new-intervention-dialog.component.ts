import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-new-intervention-dialog',
  templateUrl: './new-intervention-dialog.component.html',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogContent,
    NgForOf,
    MatDialogActions,
    MatDialogTitle,
    MatButton
  ],
  standalone: true,
})
export class NewInterventionDialogComponent {
  newIntervention = {
    clientId: null,
    vehicleId: null,
    mechanicLeaderId: null,
    registrationDate: '',
    modality: '',
    description: '',
  };

  clientVehicles: any[] = [];
  clientDni = '';
  mechanicOptions = [
    { id: 1, name: 'Mechanic A' },
    { id: 2, name: 'Mechanic B' },
  ];

  constructor(public dialogRef: MatDialogRef<NewInterventionDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitForm(): void {
    this.dialogRef.close(this.newIntervention);
  }

  fetchClientByDni(): void {

  }
}

import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {Vehicle} from "../../../service/model/vehicle.entity";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-new-vehicle-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatIconButton,
    MatIcon,
    MatFormField,
    FormsModule,
    MatLabel,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogContent
  ],
  templateUrl: './new-vehicle-dialog.component.html',
  styleUrl: './new-vehicle-dialog.component.css'
})
export class NewVehicleDialogComponent {
  public vehicle: Vehicle = new Vehicle();

  constructor(public dialogRef: MatDialogRef<NewVehicleDialogComponent>) {}

  onSave() {
    this.dialogRef.close(this.vehicle);
  }

  onCancel() {
    this.dialogRef.close();
  }
}

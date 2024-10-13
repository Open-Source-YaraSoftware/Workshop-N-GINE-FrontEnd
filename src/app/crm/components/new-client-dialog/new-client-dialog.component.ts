import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatSelect } from "@angular/material/select";
import { MatOption } from "@angular/material/core";

@Component({
  selector: 'app-new-client-dialog',
  templateUrl: './new-client-dialog.component.html',
  styleUrls: ['./new-client-dialog.component.css'],
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    FormsModule,
    MatButton,
    MatSelect,
    MatOption,
    MatDialogModule
  ]
})
export class NewClientDialogComponent {
  constructor(public dialogRef: MatDialogRef<NewClientDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }
}

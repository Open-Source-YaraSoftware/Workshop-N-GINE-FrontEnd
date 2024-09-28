import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import { Mechanic } from '../../model/mechanic.entity';
import { Role } from '../../model/role.enum';
import { Workshop } from '../../model/workshop.entity';
import { AccountState } from '../../model/account-state.enum';
import { Notification } from '../../model/notification.entity'; // Ensure this is imported
import { Task } from '../../model/task.entity';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button"; // Ensure this is imported

@Component({
  selector: 'app-new-mechanic-dialog',
  templateUrl: './new-mechanic-dialog.component.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    FormsModule,
    MatDialogActions,
    MatButton
  ],
  styleUrls: ['./new-mechanic-dialog.component.css']
})
export class NewMechanicDialogComponent {
  mechanic!: Mechanic; // Non-null assertion, mechanic will be injected

  constructor(
    public dialogRef: MatDialogRef<NewMechanicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mechanic: Mechanic }
  ) {
    // Assign the mechanic from injected data or default to an empty object
    this.mechanic = data.mechanic || {
      id: 0,
      firstName: '',
      lastName: '',
      dni: '',
      email: '',
      password: '',
      role: Role.MECHANIC, // Default role for new mechanics
      workshop: new Workshop(),
      accountState: AccountState.ACTIVE, // Default active state
      notificationList: [] as Notification[],
      taskList: [] as Task[]
    };
  }

  onSubmit(): void {
    this.dialogRef.close(this.mechanic); // Send the mechanic back to parent on submit
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without saving changes
  }
}

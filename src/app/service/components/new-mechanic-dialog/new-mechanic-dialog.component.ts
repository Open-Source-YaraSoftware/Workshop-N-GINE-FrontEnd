import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Profile } from '../../../profiles/model/profile.entity';
import { Role } from '../../model/role.enum';
import { Workshop } from '../../model/workshop.entity';
import { AccountState } from '../../model/account-state.enum';

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
  mechanic!: Profile;

  constructor(
    public dialogRef: MatDialogRef<NewMechanicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mechanic: Profile }
  ) {
    this.mechanic = data.mechanic || {
      id: 0,
      firstName: '',
      lastName: '',
      dni: 0,
      email: '',
      age: 0,
      location: '',
      password: '',
      role: Role.MECHANIC,
      workshop: new Workshop(),
      accountState: AccountState.ACTIVE,
    };
  }

  onSubmit(): void {
    this.dialogRef.close(this.mechanic);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

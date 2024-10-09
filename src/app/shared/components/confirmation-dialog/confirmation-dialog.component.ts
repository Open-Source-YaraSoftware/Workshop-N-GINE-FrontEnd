import {Component, EventEmitter, Output, Inject} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButton
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  @Output() confirm = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onConfirm(): void {
    this.confirm.emit();
    this.dialogRef.close();
  }

  onDismiss(): void {
    this.dialogRef.close();
  }
}

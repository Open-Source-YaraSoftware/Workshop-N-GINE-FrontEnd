import {Component, inject, Input, signal, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {CheckpointService} from "../../services/checkpoint.service";
import {Checkpoint} from "../../model/checkpoint.entity";
import {MatList, MatListItem} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-activity-tracking',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatButton,
    MatInput,
    MatList,
    MatListItem,
    MatDivider,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './activity-tracking.component.html',
  styleUrl: './activity-tracking.component.css'
})
export class ActivityTrackingComponent {
  @Input() interventionId!: number;
  @Input() taskSelectedId!: number;

  protected trackingForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  protected isEditMode = signal(false);
  protected checkpoints = signal<Checkpoint[]>([]);
  private checkpointService: CheckpointService = inject(CheckpointService);
  private checkpointSelected = signal<Checkpoint>(new Checkpoint());

  ngOnChanges( changes: SimpleChanges ) {
    if (changes['taskSelectedId'] && !changes['taskSelectedId'].isFirstChange()) {
      this.getCheckpoints();
    }

  }

  private getCheckpoints() {
    this.checkpointService.getAllByTaskId(this.taskSelectedId)
      .subscribe((checkpoints: Checkpoint[]) => {
        this.checkpoints.set(checkpoints);
      });
  }

  protected onSubmit(){
    if(this.trackingForm.invalid) return;
    if (this.isEditMode()){
      this.updateCheckpoint();
    } else {
      this.addCheckpoint();
    }
    this.trackingForm.reset();
    this.isEditMode.set(false);
  }

  protected onCancelRequest() {
    this.isEditMode.set(false);
    this.trackingForm.reset();
  }

  protected onEditCheckpoint(checkpoint: Checkpoint) {
    this.checkpointSelected.set(checkpoint);
    this.trackingForm.get('name')?.setValue(checkpoint.name);
    this.isEditMode.set(true);
  }

  protected onDeleteCheckpoint(checkpoint: Checkpoint) {
    this.checkpointService.delete(checkpoint.id)
      .subscribe(() => {
        this.getCheckpoints();
      });
  }

  private addCheckpoint() {
    const checkpoint = new Checkpoint();
    const nameValue = this.trackingForm.get('name')?.value;
    if (nameValue) checkpoint.name = nameValue;
    checkpoint.taskId = this.taskSelectedId;
    this.checkpointService.create(checkpoint)
      .subscribe(() => {
        this.getCheckpoints();
      });
  }

  private updateCheckpoint() {
    const checkpoint = this.checkpointSelected();
    const nameValue = this.trackingForm.get('name')?.value;
    if (nameValue) checkpoint.name = nameValue;
    this.checkpointService.update(checkpoint.id, checkpoint)
      .subscribe(() => {
        this.getCheckpoints();
      });
  }
}

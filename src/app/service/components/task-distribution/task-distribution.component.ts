import {Component, computed, effect, EventEmitter, inject, Input, Output, signal} from '@angular/core';
import {Task} from "../../model/task.entity";
import {JsonPipe} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {PersonnelService} from "../../services/personnel.service";
import {Mechanic} from "../../model/mechanic.entity";
import {MatOption, MatSelect} from "@angular/material/select";

@Component({
  selector: 'app-task-distribution',
  standalone: true,
  imports: [
    JsonPipe,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    ReactiveFormsModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatIconButton,
    MatIcon,
    MatSelect,
    MatOption
  ],
  templateUrl: './task-distribution.component.html',
  styleUrl: './task-distribution.component.css'
})
export class TaskDistributionComponent {
  protected task = new Task();
  @Input() tasks!: Task[];
  @Input() interventionId!: number;
  @Output() protected taskAddRequested = new EventEmitter<Task>();
  @Output() protected taskUpdatedRequested = new EventEmitter<Task>();
  @Output() protected taskDeleteRequested = new EventEmitter<number>();

  protected displayedColumns: string[] = ['task', 'mechanic', 'options'];
  private personnelService: PersonnelService = inject(PersonnelService);
  protected mechanics = signal<Mechanic[]>([]);
  protected editMode = signal(false);

  private isValid = computed(() => this.taskForm.valid);

  constructor() {
    this.getMechanics();
  }

  protected taskForm = new FormGroup({
    taskName: new FormControl('', [Validators.required]),
    mechanic: new FormControl(0, [Validators.required])
  });

  protected onSubmit(event: Event) {
    event.preventDefault();
    if(this.isValid()){
      this.modifyTask();
      if(this.editMode()) {
        this.taskUpdatedRequested.emit(this.task);
        this.editMode.set(false);
      } else {
        this.taskAddRequested.emit(this.task);
      }
    } else {
      console.log('Invalid form data');
    }
  }

  private modifyTask() {
    if(this.taskForm.value.taskName) {
      this.task.description = this.taskForm.value.taskName;
    }
    if(this.taskForm.value.mechanic) {
      this.task.assistant.id = Number(this.taskForm.value.mechanic);
    }
    const mechanic = this.mechanics().find(mechanic => mechanic.id === this.task.assistant.id);
    if(mechanic) {
      this.task.assistant.firstName = mechanic.firstName;
      this.task.assistant.lastName = mechanic.lastName;
    }
    this.task.intervention.id = Number(this.interventionId);
  }

  private getMechanics() {
    this.personnelService.getByWorkshopId(1)
      .subscribe((mechanics) => {
        this.mechanics.set(mechanics);
      });
  }

  protected onEditItem(task: Task) {
    this.editMode.set(true);
    this.task = task;
    this.taskForm.setValue({
      taskName: task.description,
      mechanic: task.assistant.id
    })
  }

  protected onDeleteItem(task: Task) {
    this.taskDeleteRequested.emit(task.id);
    this.taskForm.reset();
  }

  protected  onCancelRequest() {
    this.editMode.set(false);
    this.taskForm.reset();
  }
}

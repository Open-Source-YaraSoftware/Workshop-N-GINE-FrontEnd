import {Component, EventEmitter, Input, Output, signal} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatInput} from "@angular/material/input";
import {Intervention} from "../../model/intervention.entity";
import {JsonPipe} from "@angular/common";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {InterventionType} from "../../model/intervention-type.enum";

@Component({
  selector: 'app-intervention-diagnostic',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInput,
    JsonPipe,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './intervention-diagnostic.component.html',
  styleUrl: './intervention-diagnostic.component.css'
})
export class InterventionDiagnosticComponent {
  @Input() intervention!: Intervention;
  @Output() protected interventionUpdateRequested = new EventEmitter<Intervention>();
  protected interventionType = new FormControl();
  protected interventionDescription = new FormControl('');
  protected hasChanged = signal(false);

  ngOnInit(){
    this.interventionType.setValue(this.intervention.interventionType);
    this.interventionType.valueChanges.subscribe(() => this.updateHasChanged());
    this.interventionDescription.valueChanges.subscribe(() => this.updateHasChanged());
  }

  private updateHasChanged() {
    this.hasChanged.set(this.interventionType.value !== this.intervention.interventionType ||
      this.interventionDescription.value !== this.intervention.description);
  }

  protected onResetValues() {
    this.interventionType.setValue(this.intervention.interventionType);
    this.interventionDescription.setValue(this.intervention.description);
  }

  protected onUpdateIntervention() {
    if(this.interventionType.value || this.interventionType.value === 0) this.intervention.interventionType = (this.interventionType.value === 1)? InterventionType.MAINTENANCE : InterventionType.REPARATION;
    if(this.interventionDescription.value) this.intervention.description = this.interventionDescription.value;
    this.interventionUpdateRequested.emit(this.intervention);
    this.hasChanged.set(false);
  }
}

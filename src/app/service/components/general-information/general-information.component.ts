import {Component, Input, OnInit} from '@angular/core';
import {Intervention} from "../../model/intervention.entity";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInput, MatLabel} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {Mechanic} from "../../model/mechanic.entity";
import {Vehicle} from "../../model/vehicle.entity";

@Component({
  selector: 'app-general-information',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatDatepickerToggle,
    MatSuffix,
    MatDatepickerInput,
    MatDatepicker,
    MatButton,
    MatIcon,
    MatFabButton,
    NgForOf
  ],
  templateUrl: './general-information.component.html',
  styleUrl: './general-information.component.css'
})
export class GeneralInformationComponent implements OnInit {
  @Input() intervention!: Intervention;
  @Input() mechanics!: Mechanic[];
  @Input() vehicles!: Vehicle[];
  @Input() isOwner: boolean = false;

  interventionForm!: FormGroup

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.interventionForm = this.setInterventionForm();
    console.log(this.interventionForm.value)
  }

  private setInterventionForm() {
    return this.fb.group({
      dni: [this.intervention.vehicle.owner.dni, Validators.required],
      client: [(this.intervention.vehicle.owner.firstName + ' ' + this.intervention.vehicle.owner.lastName), Validators.required],
      licensePlate: [this.intervention.vehicle.licensePlate, Validators.required],
      brand: [this.intervention.vehicle.brand, Validators.required],
      model: [this.intervention.vehicle.model, Validators.required],
      modality: [this.intervention.interventionType, Validators.required],
      scheduledDate: [this.intervention.registrationDate, Validators.required],
      leadMechanic: [
        `${this.mechanics.find(mechanic => mechanic.id === this.intervention.leader.id)?.firstName || ''} ${this.mechanics.find(mechanic => mechanic.id === this.intervention.leader.id)?.lastName || ''}`,
        Validators.required
      ],
      description: [this.intervention.description]
    });

  }

  onSubmit(): void {
    if (this.interventionForm.valid) {
      console.log('Valid form, sending data...', this.interventionForm.value);
    }
  }
}

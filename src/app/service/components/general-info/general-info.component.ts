import {Component, Input} from '@angular/core';
import {Vehicle} from "../../model/vehicle.entity";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatFormField,
    MatInput
  ],
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.css'
})
export class GeneralInfoComponent {
  @Input() vehicle!: Vehicle;
}

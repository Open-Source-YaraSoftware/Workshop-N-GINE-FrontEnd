import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormField } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { VehicleItemComponent } from "../../components/vehicle-item/vehicle-item.component";
import { NgForOf } from "@angular/common";
import { MatInput, MatLabel } from "@angular/material/input";
import { MatButton, MatIconButton } from "@angular/material/button";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [
    MatFormField,
    MatSelect,
    MatOption,
    MatIcon,
    MatIconModule,
    VehicleItemComponent,
    NgForOf,
    MatInput,
    MatLabel,
    MatButton,
    FormsModule,
    MatIconButton
  ],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.css'
})
export class ClientDetailComponent {
  protected clientId: number = 0;
  protected workshopClient: any = {};
  protected vehicles: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {}
}

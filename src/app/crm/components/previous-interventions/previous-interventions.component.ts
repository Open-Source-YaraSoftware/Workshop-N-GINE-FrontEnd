import {Component, Input, SimpleChanges} from '@angular/core';
import {
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatIcon} from "@angular/material/icon";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {DatePipe, NgForOf} from "@angular/common";
import {Vehicle} from "../../../service/model/vehicle.entity";
import {Intervention} from "../../../service/model/intervention.entity";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-previous-interventions',
  standalone: true,
  imports: [
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionModule,
    MatIcon,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardSubtitle,
    NgForOf,
    DatePipe,
    MatButton,
    MatCardActions,
    RouterLink
  ],
  templateUrl: './previous-interventions.component.html',
  styleUrl: './previous-interventions.component.css'
})
export class PreviousInterventionsComponent {
  @Input() vehicle!: Vehicle;

  previousInterventions!: Intervention[];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vehicle'] && changes['vehicle'].currentValue) {
      this.previousInterventions = this.vehicle.interventionRegister || [];
    }
  }
}

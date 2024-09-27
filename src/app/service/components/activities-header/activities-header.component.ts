import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-activities-header',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './activities-header.component.html',
  styleUrl: './activities-header.component.css'
})
export class ActivitiesHeaderComponent {

}

import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-activities-header',
  standalone: true,
  imports: [
    RouterOutlet,
    MatAnchor,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './activities-header.component.html',
  styleUrl: './activities-header.component.css'
})
export class ActivitiesHeaderComponent {

}

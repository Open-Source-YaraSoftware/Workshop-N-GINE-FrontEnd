import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-analytics-header',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './analytics-header.component.html',
  styleUrl: './analytics-header.component.css'
})
export class AnalyticsHeaderComponent {

}

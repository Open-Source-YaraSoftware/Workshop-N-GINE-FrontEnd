import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-task-header',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './task-header.component.html',
  styleUrl: './task-header.component.css'
})
export class TaskHeaderComponent {

}

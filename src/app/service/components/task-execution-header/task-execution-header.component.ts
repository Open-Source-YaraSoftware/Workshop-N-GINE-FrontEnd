import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-task-execution-header',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './task-execution-header.component.html',
  styleUrl: './task-execution-header.component.css'
})
export class TaskExecutionHeaderComponent {

}

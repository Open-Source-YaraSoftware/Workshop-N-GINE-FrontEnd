import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";
import {MatIcon} from "@angular/material/icon";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-base-message',
  standalone: true,
  imports: [
    MatIcon,
    NgClass
  ],
  templateUrl: './base-message.component.html',
  styleUrl: './base-message.component.css'
})
export class BaseMessageComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string, level: number }) {
    console.log('Level:', data.level);
  }

  getLevelClass(level: number): string {
    switch (level) {
      case 1: return 'success';
      case 2: return 'warning';
      case 3: return 'error';
      default: return '';
    }
  }

  getIcon(level: number): string {
    switch (level) {
      case 1: return 'check_circle';
      case 2: return 'warning';
      case 3: return 'error';
      default: return '';
    }
  }
}

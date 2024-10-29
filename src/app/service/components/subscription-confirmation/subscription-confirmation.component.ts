import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-subscription-confirmation',
  templateUrl: './subscription-confirmation.component.html',
  standalone: true,
  styleUrls: ['./subscription-confirmation.component.css'],
  imports: [MatButton]
})
export class SubscriptionConfirmationComponent {
  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  standalone: true,
  styleUrls: ['./subscription.component.css'],
  imports: [CommonModule, MatButton]
})
export class SubscriptionComponent {
  subscriptions = [
    { id: 1, name: 'Basic Plan', price: 10 },
    { id: 2, name: 'Pro Plan', price: 20 },
    { id: 3, name: 'Premium Plan', price: 30 }
  ];

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-subscription-history',
  templateUrl: './subscription-history.component.html',
  standalone: true,
  styleUrls: ['./subscription-history.component.css'],
  imports: [CommonModule, MatButton]
})
export class SubscriptionHistoryComponent {
  history = [
    { id: 1, planName: 'Basic Plan', startDate: '2024-01-01', endDate: '2024-06-30', status: 'Expired' },
    { id: 2, planName: 'Pro Plan', startDate: '2024-07-01', endDate: null, status: 'Active' },
  ];

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}

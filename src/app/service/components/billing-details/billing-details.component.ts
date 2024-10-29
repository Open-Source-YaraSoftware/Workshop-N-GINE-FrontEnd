import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-billing-details',
  standalone: true,
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css'],
  imports: [MatButton]
})
export class BillingDetailsComponent {
  billingDetails = {
    cardHolderName: 'John Doe',
    cardNumber: '**** **** **** 1234',
    expirationDate: '12/26',
    billingAddress: '123 Main St, City, Country'
  };

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}

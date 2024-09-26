import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-inventory-header',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './inventory-header.component.html',
  styleUrl: './inventory-header.component.css'
})
export class InventoryHeaderComponent {

}

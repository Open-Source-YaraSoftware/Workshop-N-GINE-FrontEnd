import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-inventory-header',
  standalone: true,
  imports: [
    RouterOutlet,
    MatAnchor,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './inventory-header.component.html',
  styleUrl: './inventory-header.component.css'
})
export class InventoryHeaderComponent {

}

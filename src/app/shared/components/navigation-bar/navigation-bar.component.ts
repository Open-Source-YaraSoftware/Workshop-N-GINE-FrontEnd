import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    MatIcon,
    MatButton,
    MatIconButton
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  navigationItems = signal([
    {
      name: 'Personnel',
      namePath: 'personnel',
      role: 1,
      isPublic: false
    },
    {
      name: 'Clients',
      namePath: 'clients',
      role: 1,
      isPublic: false
    },
    {
      name: 'Interventions',
      namePath: 'interventions',
      role: 1,
      isPublic: false
    },
    {
      name: 'Inventory',
      namePath: 'inventory',
      role: 1,
      isPublic: false
    },
    {
      name: 'Metrics',
      namePath: 'metrics',
      role: 1,
      isPublic: false
    },
    {
      name: 'My activities',
      namePath: 'activities',
      role: 2,
      isPublic: false
    },
    {
      name: 'Vehicles',
      namePath: 'vehicles',
      role: 3,
      isPublic: false
    },
    {
      name: 'Notifications',
      namePath: 'notifications',
      isPublic: true
    }
  ]);
}

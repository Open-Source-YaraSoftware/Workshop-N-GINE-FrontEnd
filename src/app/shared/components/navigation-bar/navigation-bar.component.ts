import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {AuthenticationService} from "../../../iam/services/authentication.service";

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
  roleId: number | undefined;
  navigationItems = signal<any[]>([]);

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentRoleId.subscribe(roleId => {
      this.roleId = roleId;
      this.updateNavigationItems();
    });
  }

  isOwner() {
    return this.roleId == 2;
  }

  isClient() {
    return this.roleId == 3;
  }

  isMechanic() {
    return this.roleId == 1;
  }


  private updateNavigationItems() {
    this.navigationItems.set([
      {
        name: 'Personnel',
        namePath: 'personnel',
        isPublic: this.isOwner()
      },
      {
        name: 'Clients',
        namePath: 'clients',
        isPublic: this.isOwner()
      },
      {
        name: 'Interventions',
        namePath: 'interventions',
        isPublic: this.isOwner()
      },
      {
        name: 'Inventory',
        namePath: 'inventory',
        isPublic: this.isOwner()
      },
      {
        name: 'Metrics',
        namePath: 'metrics',
        isPublic: this.isOwner()
      },
      {
        name: 'My activities',
        namePath: 'activities',
        isPublic: this.isMechanic()
      },
      {
        name: 'Vehicles',
        namePath: 'vehicles',
        isPublic: this.isClient()
      },
      {
        name: 'Notifications',
        namePath: 'notifications',
        isPublic: true
      }
    ]);
  }
}

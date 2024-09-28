import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderContentComponent} from "../header-content/header-content.component";
import {NavigationBarComponent} from "../navigation-bar/navigation-bar.component";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderContentComponent,
    NavigationBarComponent,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
}

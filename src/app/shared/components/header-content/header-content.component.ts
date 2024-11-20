import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton, MatButtonModule } from "@angular/material/button";
import { RouterModule } from '@angular/router';
import {AuthenticationService} from "../../../iam/services/authentication.service";

@Component({
  selector: 'app-header-content',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.css']
})
export class HeaderContentComponent {
  constructor(private authenticationService: AuthenticationService) { }

  logout(){
    this.authenticationService.signOut();
  }
}

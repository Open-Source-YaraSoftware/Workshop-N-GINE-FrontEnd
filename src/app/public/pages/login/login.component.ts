import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {AuthenticationService} from "../../../iam/services/authentication.service";
import {SignInRequest} from "../../../iam/model/sign-in.request";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButton
  ]
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(1)]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    const signInRequest = new SignInRequest(username, password);
    this.authenticationService.signIn(signInRequest);
    this.submitted = true;
  }
}

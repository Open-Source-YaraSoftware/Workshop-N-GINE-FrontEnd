import {Component, signal} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {WorkshopService} from "../../../service/services/workshop.service";
import {Workshop} from "../../../service/model/workshop.entity";
import {SignUpRequest} from "../../../iam/model/sign-up.request";
import {AuthenticationService} from "../../../iam/services/authentication.service";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButton
  ]
})
export class SignUpComponent {
  signupForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router, private workshopService: WorkshopService, private authenticationService: AuthenticationService) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      workshopName: ['', Validators.required]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.createWorkshop();
    }
  }

  createWorkshop() {
    const newWorkshop = new Workshop();
    newWorkshop.name =  this.signupForm.value.workshopName;
    this.workshopService.createWorkshop(newWorkshop)
      .subscribe((workshop) => {
        let username = this.signupForm.value.username;
        let password = this.signupForm.value.password;
        let roleId=  2;
        let workshopId = workshop.id;
        const signUpRequest = new SignUpRequest(username, password, roleId, workshopId);
        this.authenticationService.signUp(signUpRequest);
        this.submitted = true;
      });
  }
}

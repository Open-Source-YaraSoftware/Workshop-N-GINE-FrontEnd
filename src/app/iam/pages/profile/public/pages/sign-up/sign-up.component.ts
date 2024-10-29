import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SignUpComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
      console.log('Signup attempt', this.signupForm.value);
      this.router.navigate(['/login']);
    }
  }
}

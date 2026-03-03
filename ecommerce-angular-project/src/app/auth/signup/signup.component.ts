import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { SignUpRequest } from 'src/app/models/signup-request.model';
import { SignupResponse } from 'src/app/models/signup-response.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  loading = false;
  serverMessage = '';
  serverError = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Access form controls safely
  get f() {
    return this.signupForm.controls;
  }

  onSubmit(): void {
    // If form is invalid, mark all fields touched
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.serverMessage = '';
    this.serverError = '';

    // Build request object including default role
    const request: SignUpRequest & { role: string } = {
      name: this.f['name'].value,
      email: this.f['email'].value,
      mobileNumber: this.f['mobileNumber'].value,
      password: this.f['password'].value,
      role: 'ROLE_USER' // Default backend role
    };

    this.authService.signup(request).subscribe({
      next: (response: SignupResponse) => {
        this.serverMessage = response.message;
        this.signupForm.reset();
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.serverError = error.error?.message || 'Something went wrong!';
        this.loading = false;
      }
    });
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage: string = '';
  showLoginForm = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appService: AppService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleLoginForm() {
    this.showLoginForm = true;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;
    const { email, password } = this.loginForm.value;
    console.log('Login user:', email);
    console.log('Login password:', password);

    this.appService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login response:', response);

        // Since API returns simple boolean, check directly
        if (response === true) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userid', email); // Optional: store userid

          // Navigate to dashboard instead of form
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid userid or password';
        }
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Login failed. Please try again.';
        this.isSubmitting = false;
      },
    });
  }
}

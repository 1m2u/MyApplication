import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage: string = '';
  showLoginForm = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  toggleLoginForm() {
    this.showLoginForm = true;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    // Replace this with your actual authentication service call
    setTimeout(() => {
      // Mock authentication - in real app, call your auth service here
      const { email, password } = this.loginForm.value;
      
      // This is just for demonstration. In a real app, you'd call your auth service
      if (email === 'user@example.com' && password === 'password123') {
        // Save token or user data to localStorage/sessionStorage
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/form']);
      } else {
        this.errorMessage = 'Invalid email or password';
      }
      
      this.isSubmitting = false;
    }, 1000); // Simulating network delay
  }
}
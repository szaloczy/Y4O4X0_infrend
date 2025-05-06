import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDTO, RegisterDTO } from '../../types';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  fb = inject(FormBuilder);
  userService = inject(UserService);
  authService = inject(AuthService);
  toastService = inject(ToastService);
  router = inject(Router);
  loginForm!: FormGroup;
  isLoginMode = true;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      username: ['']
    });
  }

  toggleMode() {
    return this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    if (this.isLoginMode) {
      this.login();
    } else {
      this.register();
    }
  }

  register() {
    const registerData = this.loginForm.value as RegisterDTO;

    this.userService.register(registerData).subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
        this.toastService.showSuccess('Sikeres regisztráció');
        this.toggleMode();
      },
      error: (err) => {
        this.toastService.showError(err.error.message);
        console.error(err);
      }
    });
  }

  login() {
    const loginData = this.loginForm.value as LoginDTO;

    this.userService.login(loginData).subscribe({
      next: (response) => {
        this.authService.setToken(response.accessToken);
        this.router.navigateByUrl('/');
        this.toastService.showSuccess('Sikeres Bejelentkezés');
      },
      error: (err) => {
        this.toastService.showError(err.error.message);
        console.error(err);
      }
    });
  }
}

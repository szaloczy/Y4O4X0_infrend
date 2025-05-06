import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginDTO, RegisterDTO } from '../../types';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';

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
  router = inject(Router);
  loginForm!: FormGroup;
  isLoginMode = true;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
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
        this.toggleMode();
      },
      error: (err) => {
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
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-user-register',
  standalone:true,
  imports: [
        MatButtonModule,
        FormsModule,
        RouterLink,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
  ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent {
  router = inject(Router);
  registerForm: FormGroup;
  authService = inject(AuthService);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.nonNullable.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    if(this.registerForm.valid) {
      this.authService.register(this.registerForm.value).
      subscribe({
        next: (response) => {
          console.log("Registration successfully", response);
          this.router.navigate(['/login'])
        },
        error: (error) => console.error("Registration failed", error)
      });
    }
  }
}

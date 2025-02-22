import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone:true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  router = inject(Router);
  loginForm: FormGroup;
  

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        response => {
          console.log('Login successful', response);
        },
        error => {
          console.error('Login failed', error);
        }
      )
    }
  }

}

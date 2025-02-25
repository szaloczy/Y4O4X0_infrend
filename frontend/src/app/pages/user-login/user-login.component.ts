import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  authService = inject(AuthService);
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
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).
        subscribe((data: any) => {
          if(this.authService.isLoggedIn()) {
            this.router.navigate(['/home']);
          }
          console.log(data);
        });      
    }
  }

}

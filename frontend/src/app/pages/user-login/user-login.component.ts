import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-user-login',
  standalone:true,
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  loginForm: FormGroup;
  

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loginForm = this.fb.nonNullable.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value).
        subscribe((response) => {
          console.log('response: ', response)
          if(this.authService.isLoggedIn()) {
            this.authService.currentUserSig.set(response.user);
            this.router.navigate(['/dashboard']);
          }
        });      
    }
  }

}

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { LoginDTO } from '../../types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  formBuilder = inject(FormBuilder);
  userService = inject(UserService);
  authService = inject(AuthService);
  router = inject(Router);
  toastService = inject(ToastrService);

  constructor(private fb: FormBuilder) {
     this.loginForm = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
     });
  }

  onSubmit() {
    if(this.loginForm.valid) {
      const loginData = this.loginForm.value as LoginDTO;
      this.userService.login(loginData).subscribe({
        next: (response) => {
          this.authService.setToken(response.accessToken);
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          this.toastService.error(err.error.error, 'Error')
        }
      });
    }
  }
}

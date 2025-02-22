import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  standalone:true,
  imports: [FormsModule,
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

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if(this.registerForm.valid) {
      console.log('Registration successfully', this.registerForm.value);
      
    }
  }
}

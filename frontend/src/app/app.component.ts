import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { UserLoginComponent } from "./pages/user-login/user-login.component";
import { User } from './types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, 
    HttpClientModule, 
    UserLoginComponent,
  ], 
  templateUrl: "./app.component.html",
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(response => {
      this.users = response.data;
    });
    }
}

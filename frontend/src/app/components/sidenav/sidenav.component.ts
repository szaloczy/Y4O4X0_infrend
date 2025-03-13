import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { routes } from '../../app.routes';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
}

@Component({
  selector: 'app-sidenav',
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit{

  authService = inject(AuthService);
  userService = inject(UserService);
  username: string = '';

  sideNavCollapsed = signal(false);

  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');

  ngOnInit(): void {
    this.username = this.userService.getUserName() || '';
  }

  logout() {
    this.authService.logout();
  }
}

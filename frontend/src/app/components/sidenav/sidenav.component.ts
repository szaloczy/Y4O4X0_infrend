import { Component, computed, Input, signal } from '@angular/core';
import { routes } from '../../app.routes';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
export class SidenavComponent {
  sideNavCollapsed = signal(false);

  @Input() set collapsed(value: boolean) {
    this.sideNavCollapsed.set(value);
  }

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');

  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard'
    },
    {
      icon: 'store',
      label: 'Warehouse',
      route: 'warehouse'
    },
    {
      icon: 'polymer',
      label: 'Products',
      route: 'valami'
    },
    {
      icon: 'reorder',
      label: 'Orders',
      route: 'valami'
    },
    {
      icon: 'exit_to_app',
      label: 'Exit',
      route: 'valami'
    }
  ]);


 
}

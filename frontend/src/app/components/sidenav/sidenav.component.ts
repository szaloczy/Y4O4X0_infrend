import { Component, computed, Input, signal } from '@angular/core';
import { routes } from '../../app.routes';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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
      label: 'Profil',
      route: 'valami'
    },
    {
      icon: 'dashboard',
      label: 'Egységek kezelése',
      route: 'valami'
    },
    {
      icon: 'dashboard',
      label: 'Gyártmányok',
      route: 'valami'
    },
    {
      icon: 'dashboard',
      label: 'Megrendelés',
      route: 'valami'
    },
    {
      icon: 'exit_to_app',
      label: 'kilépés',
      route: 'valami'
    }
  ]);


 
}

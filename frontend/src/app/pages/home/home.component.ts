import { Component, computed, signal } from '@angular/core';
 
@Component({
  selector: 'app-home',
  imports: [
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  collapsed = signal(false);
  sidenavWidth = computed(() => this.collapsed() ? '65px' : '250px');
}


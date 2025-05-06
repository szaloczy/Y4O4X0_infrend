import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastComponent } from "./shared/toast/toast.component";
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    ToastComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  toastService = inject(ToastService);
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
    this.toastService.showSuccess('Sikeres kijelentkezés');
  }
}

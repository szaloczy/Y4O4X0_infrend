import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'accessToken';
  router = inject(Router);

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY)
  }

  removeToken() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  preventGuestAccess(): boolean {
    const isLoggedIn = this.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigateByUrl('/login');
    }
    return isLoggedIn;
  }

  getUserName(): string {
    const token = this.getToken();
    return this.decodeToken()?.name || 'Ismeretlen';
  }
  
  getUserRole(): string {
    const token = this.getToken();
    switch (this.decodeToken()?.role) {
      case 'admin': return 'Adminisztrátor';
      case 'user': return 'Önkéntes';
      default: return 'Ismeretlen';
    }
  }

  isAdmin(): boolean {
    const token = this.getToken();
    return this.decodeToken()?.role === 'admin';
  }
  
  decodeToken(): any {
    const token = this.getToken();
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }
}

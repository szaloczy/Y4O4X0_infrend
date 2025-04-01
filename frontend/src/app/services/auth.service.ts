import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEY_KEY = 'accessToken';

  constructor() {}

  setToken(token: string) {
    localStorage.setItem(this.TOKEY_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEY_KEY);
  }

  removeToken() {
    localStorage.removeItem(this.TOKEY_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

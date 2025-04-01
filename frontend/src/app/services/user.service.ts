import { inject, Injectable } from '@angular/core';
import { AccesTokenDTO, LoginDTO, RegisterDTO } from '../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = 'http://localhost:3000/api/user'
  http = inject(HttpClient);

  register(data: RegisterDTO) { return this.http.post<string>(`${this.apiUrl}/signup`, data) };

  login(data: LoginDTO) { return this.http.post<AccesTokenDTO>(`${this.apiUrl}/login`, data) };
}

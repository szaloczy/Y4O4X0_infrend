import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AccessTokenDTO, LoginDTO, RegisterDTO, UserDTO } from '../../types';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/user';

  login(data: LoginDTO) {
    return this.http.post<AccessTokenDTO>(`${this.apiUrl}/login`, data);
  }

  register(data: RegisterDTO) {
    return this.http.post<string>(`${this.apiUrl}`, data);
  }

  getAll() {
    return this.http.get<UserDTO[]>(`${this.apiUrl}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/` + id);
  }
}

import { inject, Injectable } from '@angular/core';
import { AccesTokenDTO, LoginDTO, RegisterDTO } from '../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  register(data: RegisterDTO) { return this.http.post<string>(`api/user/signup`, data) };

  login(data: LoginDTO) { return this.http.post<AccesTokenDTO>(`api/user/login`, data) };
}

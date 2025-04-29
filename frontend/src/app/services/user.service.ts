import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AccessTokenDTO, LoginDTO } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/user/';

  login(data: LoginDTO) {
    return this.http.post<AccessTokenDTO>('${this.apiUrl}/login', data);
  }
}

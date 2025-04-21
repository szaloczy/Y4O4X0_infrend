import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ClientDTO } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly apiUrl = 'http://localhost:3000/api/client';

  http = inject(HttpClient);

  getAll() {
      return this.http.get<ClientDTO[]>(`${this.apiUrl}`);
    }
  
    getOne(id: number) {
      return this.http.get<ClientDTO>(`${this.apiUrl}/` + id);
    }
  
    create(client: ClientDTO) {
      return this.http.post<ClientDTO>(`${this.apiUrl}`, client);
    }
  
    update(client: ClientDTO) {
      return this.http.put<ClientDTO>(`${this.apiUrl}`, client);
    }
  
    delete(id: number) {
      return this.http.delete(`${this.apiUrl}/` + id);
    }
}

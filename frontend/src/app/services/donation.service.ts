import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DonationDTO } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private readonly apiUrl = 'http://localhost:3000/api/donation';

  http = inject(HttpClient);
  
    getAll() {
        return this.http.get<DonationDTO[]>(`${this.apiUrl}`);
      }
    
      getOne(id: number) {
        return this.http.get<DonationDTO>(`${this.apiUrl}/` + id);
      }
    
      create(donation: DonationDTO) {
        return this.http.post<DonationDTO>(`${this.apiUrl}`, donation);
      }
    
      update(donation: DonationDTO) {
        return this.http.put<DonationDTO>(`${this.apiUrl}`, donation);
      }
    
      delete(id: number) {
        return this.http.delete(`${this.apiUrl}/` + id);
      }
}

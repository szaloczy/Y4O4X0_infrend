import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DonationDTO } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private readonly apiUrl = 'http://localhost:3000/api/donation';

  http = inject(HttpClient);
  
    getAll( filters?: {
      locationId?: number;
      clientId?: number;
      fromDate?: string;
      toDate?: string;
    }): Observable<DonationDTO[]> {
      let params = new HttpParams();

      if (filters) {
        if (filters.locationId) {
          params = params.set('locationId', filters.locationId.toString());
        }
        if (filters.clientId) {
          params = params.set('clientId', filters.clientId.toString());
        }
        if (filters.fromDate) {
          params = params.set('fromDate', filters.fromDate);
        }
        if (filters.toDate) {
          params = params.set('toDate', filters.toDate);
        }
      }

        return this.http.get<DonationDTO[]>(`${this.apiUrl}`, { params });
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

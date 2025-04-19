import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocationDTO } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<LocationDTO[]>('http://localhost:3000/api/location');
  }

  getOne(id: number) {
    return this.http.get<LocationDTO>('/api/location/' + id);
  }

  create(location: LocationDTO) {
    return this.http.post<LocationDTO>('/api/location', location);
  }

  update(location: LocationDTO) {
    return this.http.put<LocationDTO>('/api/location', location);
  }

  delete(id: number) {
    return this.http.delete('/api/location/' + id);
  }
}

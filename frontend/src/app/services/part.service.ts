import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Part } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PartService {
  private readonly apiUrl = 'http://localhost:3000/api/parts';

  constructor(private http: HttpClient) { }

  getAllParts(): Observable<Part[]> {
    return this.http.get<Part[]>(this.apiUrl);
  }

  addPart(part: Omit<Part, 'id'>): Observable<Part> {
    return this.http.post<Part>(this.apiUrl, part);
  }

  updatePart(id: number, part: Partial<Part>): Observable<Part> {
    return this.http.put<Part>(`${this.apiUrl}/${id}`, part);
  }

  deletePart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPartById(id: number): Observable<Part> {
    return this.http.get<Part>(`${this.apiUrl}/${id}`);
  }

  updateStock(id: number, quantity: number): Observable<Part> {
    return this.http.patch<Part>(`${this.apiUrl}/${id}/stock`, { quantity });
  }
}

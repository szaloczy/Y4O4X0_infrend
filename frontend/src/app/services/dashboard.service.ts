import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MetricsResponse, RecentActivity } from '../types'


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/api/dashboard'; // A backend API URL-je

  constructor(private http: HttpClient) {}

  // Metrikák lekérése
  getMetrics(): Observable<MetricsResponse> {
    return this.http.get<MetricsResponse>(`${this.apiUrl}/metrics`);
  }

  // Legutóbbi tevékenységek lekérése
  getRecentActivities(): Observable<RecentActivity[]> {
    return this.http.get<RecentActivity[]>(`${this.apiUrl}/recent-activities`);
  }
}
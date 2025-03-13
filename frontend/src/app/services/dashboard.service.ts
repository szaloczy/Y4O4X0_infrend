import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:3000/api/dashboard';

  constructor(private http: HttpClient) {}

  getMetrics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/metrics`);
  }

  getRecentActivities(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recent-activities`);
  }

  getStockData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stock-data`);
  }

  getRecentOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/recent-orders`);
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }
}

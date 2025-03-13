import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  metrics: any = {};
  recentActivities: any[] = [];
  stockData: any = {};
  recentOrders: any[] = [];
  products: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getMetrics().subscribe(
      (metrics: any) => {
        this.metrics = metrics;
      },
      (error) => {
        console.error('Hiba a metrikák lekérésekor:', error);
      }
    );

    this.dashboardService.getRecentActivities().subscribe(
      (activities: any) => {
        this.recentActivities = activities;
      },
      (error) => {
        console.error('Hiba a tevékenységek lekérésekor:', error);
      }
    );

    this.dashboardService.getStockData().subscribe(
      (data: any) => {
        this.stockData = data;
      },
      (error) => {
        console.error('Hiba a készletadatok lekérésekor:', error);
      }
    );

    this.dashboardService.getRecentOrders().subscribe(
      (orders: any) => {
        this.recentOrders = orders;
      },
      (error) => {
        console.error('Hiba a megrendelések lekérésekor:', error);
      }
    );

    this.dashboardService.getProducts().subscribe(
      (products: any) => {
        this.products = products;
      },
      (error) => {
        console.error('Hiba a gyártmányok lekérésekor:', error);
      }
    );
  }

}

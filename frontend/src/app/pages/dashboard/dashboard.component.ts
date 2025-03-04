import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { DashboardService } from '../../services/dashboard.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    MatListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  totalParts: number = 0;
  totalProducts: number = 0;
  totalOrders: number = 0;
  lowStock: number = 0;
  recentActivities: string[] = [];

  constructor(private dashboardService: DashboardService, private router: Router) {}

  ngOnInit(): void {
    this.dashboardService.getMetrics().subscribe((metrics) => {
      this.totalParts = metrics.totalParts;
      this.totalProducts = metrics.totalProducts;
      this.totalOrders = metrics.totalOrders;
      this.lowStock = metrics.lowStock;
    });

    this.dashboardService.getRecentActivities().subscribe((activities) => {
      /* this.recentActivities = activities; */
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

}

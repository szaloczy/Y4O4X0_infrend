export interface UserInterface {
  id: number;
  username: string;
  email: string;
  token: string;
  password: string;
}

export interface MetricsResponse {
  totalParts: number;
  totalProducts: number;
  totalOrders: number;
  lowStock: number;
}

export interface RecentActivity {
  id: number;
  description: string;
  timestamp: string;
}
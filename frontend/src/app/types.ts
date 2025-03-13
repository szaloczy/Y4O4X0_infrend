export interface UserInterface {
  username: string;
  token: string;
  email: string;
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
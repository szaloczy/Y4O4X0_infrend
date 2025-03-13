import { NextFunction, Request, Response} from "express";
import dashboardService  from "../services/dashboardService";

class DashboardController {
    // Metrikák lekérése
    async getMetrics(req: Request, res: Response) {
      try {
        const metrics = await dashboardService.getMetrics();
        res.json(metrics);
      } catch (error) {
        res.status(500).json({ message: 'Hiba a metrikák lekérésekor', error });
      }
    }
  
    // Legutóbbi tevékenységek lekérése
    async getRecentActivities(req: Request, res: Response) {
      try {
        const activities = await dashboardService.getRecentActivities();
        res.json(activities);
      } catch (error) {
        res.status(500).json({ message: 'Hiba a tevékenységek lekérésekor', error });
      }
    }
  
    // Készletállapot adatok lekérése
    async getStockData(req: Request, res: Response) {
      try {
        const stockData = await dashboardService.getStockData();
        res.json(stockData);
      } catch (error) {
        res.status(500).json({ message: 'Hiba a készletadatok lekérésekor', error });
      }
    }
  
    // Legutóbbi megrendelések lekérése
    async getRecentOrders(req: Request, res: Response) {
      try {
        const orders = await dashboardService.getRecentOrders();
        res.json(orders);
      } catch (error) {
        res.status(500).json({ message: 'Hiba a megrendelések lekérésekor', error });
      }
    }
  
    // Gyártmányok lekérése
    async getProducts(req: Request, res: Response) {
      try {
        const products = await dashboardService.getProducts();
        res.json(products);
      } catch (error) {
        res.status(500).json({ message: 'Hiba a gyártmányok lekérésekor', error });
      }
    }
  }
  
  export default new DashboardController();
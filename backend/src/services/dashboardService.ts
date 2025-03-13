import db from "../config/db";

class DashboardService {
    // Metrikák lekérése
    async getMetrics() {
      const totalParts = await db.query('SELECT COUNT(*) AS total_parts FROM Parts');
      const totalProducts = await db.query('SELECT COUNT(*) AS total_products FROM Products');
      const totalOrders = await db.query('SELECT COUNT(*) AS total_orders FROM Orders');
      const lowStock = await db.query('SELECT COUNT(*) AS low_stock FROM Parts WHERE quantity < 10');
  
      return {
        totalParts: totalParts.rows[0].total_parts,
        totalProducts: totalProducts.rows[0].total_products,
        totalOrders: totalOrders.rows[0].total_orders,
        lowStock: lowStock.rows[0].low_stock,
      };
    }
  
    // Legutóbbi tevékenységek lekérése
    async getRecentActivities() {
      const activities = await db.query('SELECT * FROM Activities ORDER BY timestamp DESC LIMIT 5');
      return activities.rows;
    }
  
    // Készletállapot adatok lekérése
    async getStockData() {
      const partsQuantity = await db.query('SELECT name, quantity FROM Parts');
      const stockStatus = await db.query(`
        SELECT 
          COUNT(*) FILTER (WHERE quantity < 10) AS low_stock,
          COUNT(*) FILTER (WHERE quantity >= 10) AS sufficient_stock
        FROM Parts
      `);
  
      return {
        partsQuantity: partsQuantity.rows,
        stockStatus: stockStatus.rows[0],
      };
    }
  
    // Legutóbbi megrendelések lekérése
    async getRecentOrders() {
      const orders = await db.query('SELECT id, customer_name, status, order_date FROM Orders ORDER BY order_date DESC LIMIT 5');
      return orders.rows;
    }
  
    // Gyártmányok lekérése
    async getProducts() {
      const products = await db.query('SELECT id, name, description FROM Products');
      return products.rows;
    }
  }
  
  export default new DashboardService();
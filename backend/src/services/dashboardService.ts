import db from "../config/db";

export class dashboardService {

    public async getMetrics() {
        try {
             const totalParts = await db.query("SELECT AS totalParts COUNT(*) FROM parts ");
             const totalProducts = await db.query("SELECT AS totalProducts COUNT(*) FROM products");
             const totalOrders = await db.query("SELECT AS totalOrders COUNT(*) FROM orders");
             const lowStock = await db.query("SELECT COUNT(*) AS lowStock FROM parts WHERE quantity < 10");

             return {
                totalParts: totalParts.rows[0].totalparts,
                totalProducts: totalProducts.rows[0].totalproducts,
                totalOrders: totalOrders.rows[0].totalorders,
                lowStock: lowStock.rows[0].lowstock,
              };
        } catch (error) {
            throw new Error("Failed to fetch metrics");
        }
    } 
}

export default new dashboardService();
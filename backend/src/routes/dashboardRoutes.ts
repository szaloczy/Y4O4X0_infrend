import express from "express";
import dashboardController from "../controllers/dashboardController";

const router = express.Router();

// Metrikák lekérése
router.get('/metrics', dashboardController.getMetrics);

// Legutóbbi tevékenységek lekérése
router.get('/recent-activities', dashboardController.getRecentActivities);

// Készletállapot adatok lekérése
router.get('/stock-data', dashboardController.getStockData);

// Legutóbbi megrendelések lekérése
router.get('/recent-orders', dashboardController.getRecentOrders);

// Gyártmányok lekérése
router.get('/products', dashboardController.getProducts);

export default router;
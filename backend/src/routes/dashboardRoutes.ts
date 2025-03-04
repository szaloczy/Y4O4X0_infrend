import express from "express";
import dashboardService from "../services/dashboardService";
import dashboardController from "../controllers/dashboardController";

const router = express.Router();

router.get("/metrics", dashboardController.getMetrics);

export default router;
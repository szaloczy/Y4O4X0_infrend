import { NextFunction, Request, Response} from "express";
import dashboardService  from "../services/dashboardService";

class DashboardController {
    public async getMetrics (req: Request, res: Response, next: NextFunction) {
        try {
            const metrics = await dashboardService.getMetrics();
            console.log(metrics);
            res.status(200).json({success: true, data: metrics});
        } catch (error) {
            res.status(500).json({ success:false, message: 'Failed to fetch metrics: ', error });
        }
    }
}

export default new DashboardController();
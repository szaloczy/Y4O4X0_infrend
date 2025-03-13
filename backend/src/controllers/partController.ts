import {Request, Response} from "express";
import partService from "../services/partService";


class PartController {
    async getAllParts(req: Request, res: Response) {
        try {
            const parts = await partService.getAllParts();
            res.json({ success:true, data:parts });
        } catch (error) {
            res.status(500).json({ succes: false, msg: 'Failed to fetch parts: ', error})
        }
    }

    async addPart(req: Request, res: Response) {
        try {
            const newPart = await partService.addPart(req.body);
            res.status(201).json({ success: true, data: newPart });
        } catch (error) {
            res.status(500).json({ success: false, msg: 'Failed to create part: ', error });
        }
    }
}

export default new PartController();
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

    async updatePart(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const updatePart = await partService.updatePart(id, req.body);
            res.json({ success: true, data: updatePart});
        } catch (error) {
            res.status(500).json({ success: false, msg: 'Failed to update part: ', error});
        }
    }

    async deletePart(req: Request, res: Response){
        try {
            const id = parseInt(req.params.id);
            await partService.deletePart(id);

            res.status(204).json({ success: true, msg: 'part deleted successfully'})
        } catch (error) {
            res.json({ success: false, msg: 'Failed to delete part'})
        }
    }

    async getPartById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const part = await partService.getPartById(id);

            if(!part) {
                res.status(404).json({ success: false, msg: 'Part not found'})
            }
            res.json({ success: true, data: part });
        } catch (error) {
            res.status(500).json({ success: false, msg: 'Failed to fetch part details: ', error})
        }
    }

    async updateStock(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const { quantity } = req.body;
            const updatePart = await partService.updateStock(id, quantity);
            res.json({success: true, data: updatePart });
        } catch (error) {
            res.status(500).json({ success: false, msg: 'Failed to update stock: ', error});
        }
    }
}

export default new PartController();
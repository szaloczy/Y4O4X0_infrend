import express from "express";
import partController from "../controllers/partController";

const router = express.Router();

router.get('/', partController.getAllParts);
router.post('/', partController.addPart);
router.put('/:id', partController.updatePart);
router.delete('/:id', partController.deletePart);
router.get('/:id', partController.getPartById);
router.patch('/:id/stock', partController.updateStock);

export default router;
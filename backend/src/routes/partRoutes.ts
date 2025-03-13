import express from "express";
import partController from "../controllers/PartController"

const router = express.Router();

router.get('/', partController.getAllParts);

export default router;
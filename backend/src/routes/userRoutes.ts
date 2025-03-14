import express from "express";
import userController from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
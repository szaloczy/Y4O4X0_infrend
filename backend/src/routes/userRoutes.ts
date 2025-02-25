import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.get("/users/:id", userController.getUser);
router.post("/register", userController.register);

export default router;
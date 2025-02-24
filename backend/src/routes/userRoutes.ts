import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.get("/user/:id", userController.getUser);
/* router.delete("/:id", deleteUserById); */

export default router;
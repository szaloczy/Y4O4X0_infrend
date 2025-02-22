import express from "express";
import { getUserById, getAllUsers, createNewUser, updateUserById } from "../controllers/userController";

const router = express.Router();

router.post("/", createNewUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
/* router.delete("/:id", deleteUserById); */

export default router;
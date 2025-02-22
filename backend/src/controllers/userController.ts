import { Request, Response } from "express";
import { findById, findAll, createUser, updateUser} from "../models/userModel";

export const getUserById = async (req: Request, res: Response) => {
    const user = await findById(Number(req.params.id));
    user ? res.json(user) : res.status(404).json({ error: "User not found" });
  };
  
  export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
      const users = await findAll();

      if(!users || users.length == 0) {
        return;
      }

      res.status(200).json({data: users});
    } catch (error) {
      console.error("Error fetching users", error);
      res.status(500).json({error: "Internal server error" });
    }
  }
  
  export const createNewUser = async (req: Request, res: Response) => {
    try {
      const newUser = await createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "User creation failed" });
    }
  };
  
  export const updateUserById = async (req: Request, res: Response) => {
    try {
      const updatedUser = await updateUser(Number(req.params.id), req.body);
      updatedUser ? res.json(updatedUser) : res.status(404).json({ error: "User not found" });
    } catch (error) {
      res.status(500).json({ error: "Update failed" });
    }
  };
import { Request, Response } from "express";
import userService from "../services/userService";

class UserController {

    public async getUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await userService.getUserById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error});
        }
    }
    
   /*  public async register(req: Request, res: Response) {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            // Új felhasználó létrehozása
            const newUser = await userModel.createUser({ username, email, password });

            return res.status(201).json(newUser);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    } */
}

export default new UserController();

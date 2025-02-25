import { Request, Response } from "express";
import userService from "../services/userService";

class UserController {

    public async getUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.id);

            if (isNaN(userId)) {
                res.status(400).json({ msg: "Invalid user ID" });
            }

            const user = await userService.getUserById(userId);
            res.status(200).json({data: user});
        } catch (error) {
            res.status(404).json({ error: error});
        }
    }
    
    public async register(req: Request, res: Response) {
        try {
            const { email, username, password } = req.body;

            if (!email || !username || !password) {
                res.status(400).json({ success: true, msg: "All fields are required"})
            }

            const user = await userService.registerUser(email, username, password);
            res.status(201).json({ success: true, data: user });
        } catch (error) {
            res.status(400).json({ success: false, msg: error})
        }
    }
}

export default new UserController();

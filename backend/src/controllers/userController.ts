import { Request, Response } from "express";
import userService from "../services/userService";
import { User } from "../types/user";

class UserController {
    
    public async register(req: Request, res: Response) {
        try {
            const { email, username, password } = req.body;

            if (!email || !username || !password) {
                res.status(400).json({ success: false, msg: "All fields are required"})
            }

            const user = await userService.registerUser(email, username, password);
            res.status(201).json({ success: true, data: user });
        } catch (error) {
            res.status(400).json({ success: false, msg: error})
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { username, password} = req.body;

            if(!username || !password) {
                res.status(400).json({success: false, msg: "Email and password required"});
            }

            const response = await userService.loginUser(username, password);
            res.status(200).json({ response });
        } catch (error) {
            res.status(401).json({ msg:error });
        }
    }
}

export default new UserController();

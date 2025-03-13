import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next : NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
         res.status(401).json({ success: false, msg:"Unauthorized: token not found"});
         return;
    }

    jwt.verify(token, process.env.SECRET_KEY as string, (err, user) => {
        if(err) {
            res.status(403).json({ success: false, msg:"Unauthhorized: invalid token"});
        }
        (req as any).user = user;
        next();
    })
}
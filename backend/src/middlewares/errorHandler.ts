import { Request, Response, NextFunction } from "express";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.log(err);
    res.status(500).json({ error: err.message });
}

export default errorHandler;
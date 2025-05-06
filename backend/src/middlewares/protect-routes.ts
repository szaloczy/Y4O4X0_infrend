import { expressjwt } from "express-jwt";
import { secretKey } from "../config/config";

export const checkUser = expressjwt({
    secret: secretKey || "infrend",
    algorithms: ["HS256"]
});

export const handleAuthorizationError = (err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).send({ error: 'Authentication is required for this operation' });
    } else {
        next(err);
    }
}
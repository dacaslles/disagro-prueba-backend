import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { DecodedToken } from "../types/interfaces/DecodedToken";


const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        res.status(401).json({message: "No proporcionó token de acceso"});
        return
    }

    try {
        const decoded  = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
        next();
    } catch (error) {
        res.status(401).json({mesage: "Token no válido"});
    }

}

export default authenticationMiddleware;

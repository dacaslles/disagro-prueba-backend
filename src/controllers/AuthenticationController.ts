import { Request, Response } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import Usuario from "../database/models/Usuario";
import { Op } from "sequelize";


class AuthenticationController {
    static async login(req:Request, res:Response):Promise<void> {
        try {
            const { email, password } = req.body;

            const user = await Usuario.findOne({ where: {
                correo: email,
                fecha_eliminacion: {[Op.is]: null}
            } });

            if (!user) {
                res.status(400).json({message: "Correo o contraseña incorrectos"});
                return
            }

            const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
            
            if (user.contrasena != hashedPassword) {
                res.status(400).json({message: "Correo o contraseña incorrectos"});
            }

            const token = jwt.sign(
                {
                    userId: user.id_usuario,
                    email: user.correo
                },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: process.env.JWT_EXPIRES || "1h"
                }
            );

            res.status(200).json({ message: "Inicio de sesión exitoso", token });

        } catch (error) {
            console.error("Error en el login: ", error);
            res.status(500).json({message: "No fue posible procesar el inicio de sesión"});
        }
    }
}

export default AuthenticationController;
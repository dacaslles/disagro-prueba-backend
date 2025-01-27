import { Request, Response } from "express";
import { Op } from "sequelize";
import PrecioItemComercial from "../database/models/PrecioItemComercial";
import ItemComercial from "../database/models/ItemComercial";
import TipoItemComercial from "../database/models/TipoItemComercial";

class ComercialItemController {

    static async getComercialItems(req: Request, res: Response): Promise<void> {
        try {
            
            const items = await ItemComercial.findAll({
                where: {
                    fecha_eliminacion: { [Op.is]: null }
                },
                attributes: ["id_item_comercial", "nombre", "descripcion", "fecha_registro"],
                include: [
                    {
                        model: TipoItemComercial,
                    },
                    {
                        model: PrecioItemComercial,
                        attributes: ["precio"],
                        where: {
                            fecha_eliminacion: {[Op.is]: null},
                            fecha_inicio: {[Op.lte]: new Date()},
                            [Op.or]: [
                                { fecha_fin: { [Op.is]: null } },
                                { fecha_fin: { [Op.gte]: new Date() } }
                            ]
                        }
                    }
                ],
                order: [["nombre", "ASC"]]
            });

            res.status(200).json(items);

        } catch (error) {
            console.error("Error al obtener los items comerciales: ", error);
            res.status(500).json({message: "Error al obtener los items comerciales"});
        }
    }

}

export default ComercialItemController;

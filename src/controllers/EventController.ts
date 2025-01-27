import { Request, Response } from "express";
import Evento from "../database/models/Evento";
import { Op, Transaction } from "sequelize";
import PromocionEvento from "../database/models/PromocionEvento";
import Cliente from "../database/models/Cliente";
import sequelize from "../database/mysql";
import InscripcionEvento from "../database/models/InscripcionEvento";
import InteresEventoCliente from "../database/models/InteresEventoCliente";
import { RegisterToEventRequest } from "../types/interfaces/RegisterToEventRequest";
import TipoItemComercial from "../database/models/TipoItemComercial";
import PromocionPorInscripcion from "../database/models/PromocionPorInscripcion";

class EventController {

    static async getEvent(req: Request, res: Response): Promise<void> {
        try {
            const { event_id } = req.params;
            const event = await Evento.findOne({
                where: {
                    id_evento: event_id
                },
                attributes: {exclude: ["fecha_creacion", "fecha_eliminacion"]}
            });

            res.status(200).json(event);
        } catch (error) {
            console.error("Error al obtener el evento: ", error);
            res.status(500).json({message: "Error al obtener la información del evento"});
        }
    }

    static async getEvents(req: Request, res: Response): Promise<void> {
        try {
            const events = await Evento.findAll({
                where: {
                    estado: "activo",
                    fecha_fin: {[Op.gte]: new Date()},
                    fecha_eliminacion: {[Op.is]: null}
                },
                order: [["fecha_inicio", "ASC"]],
                attributes: {exclude: ["fecha_creacion", "fecha_eliminacion"]}
            });

            res.status(200).json(events);

        } catch(error) {
            console.error("Error al obtener eventos: ", error);
            res.status(500).json({message: "Error al obtener los eventos"});
        }
    }

    static async getEventPromotions(req: Request, res: Response): Promise<void> {
        try {
            
            const { event_id } = req.params;
            
                const promotions = await PromocionEvento.findAll({
                    where: {
                        id_evento: event_id,
                        fecha_inicio: {[Op.lte]: new Date()},
                        fecha_fin: {[Op.gte]: new Date()},
                        fecha_eliminacion: {[Op.is]: null}
                    },
                    include: [
                        {
                            model: TipoItemComercial,
                        },
                    ],
                    attributes: {exclude: ["fecha_registro", "fecha_eliminacion", "id_evento", "fecha_inicio", "fecha_fin", "descripcion"]},
                    order: [["orden", "ASC"]]
                });

            res.status(200).json(promotions);

        } catch (error) {
            console.error("Error al obtener la lista de promociones del evento", error);
            res.status(500).json({message: "Error al obtener la lista de promociones del evento"});
        }
    }

    static async registerToEvent(req: Request, res: Response): Promise<void> {

        const transaction: Transaction = await sequelize.transaction();

        try {
            const { eventId, names, lastnames, email, date, itemList, promotionList }: RegisterToEventRequest = req.body;

            if ( !eventId || !names || !lastnames || !email || !date || !Array.isArray(itemList)) {
                res.status(400).json({ message: "Todos los campos son obligatorios y itemList debe ser un array de números." });
                return
            }

            let client = await Cliente.findOne( { 
                where: {  
                    email: email
                },
                transaction 
            } );

            if (!client) {
               
                client = await Cliente.create({
                nombres: names,
                apellidos: lastnames,
                email: email,
                fecha_registro: new Date()
               }, { transaction });

            } else {
                const register = await InscripcionEvento.findOne({
                    where: {
                        id_evento: eventId,
                        id_cliente: client.id_cliente,
                        fecha_eliminacion: {[Op.is]: null}
                    },
                    transaction
                });

                if (register) {
                    res.status(400).json({ message: "Ya se encuentra registrado para el evento." });
                    return
                }
            }

            const register = await InscripcionEvento.create({
                fecha_asistencia: date,
                fecha_registro: new Date(),
                id_cliente: client.id_cliente,
                id_evento: eventId
            }, { transaction });

            for(let i = 0; i < itemList.length; i++) {
                await InteresEventoCliente.create({
                    fecha_registro: new Date(),
                    id_cliente: client.id_cliente,
                    id_evento: eventId,
                    id_item_comercial: itemList[i]
                }, {transaction});
            }

            for(let i = 0; i < promotionList.length; i++) {
                await PromocionPorInscripcion.create({
                    fecha_registro: new Date(),
                    id_inscripcion_evento: register.id_inscripcion_evento,
                    id_promocion_evento: promotionList[i]
                }, {transaction});
            }

            await transaction.commit();

            res.status(200).json({message: "Registro completado exitosamente"});

        } catch (error) {
            console.error("Error al registrar a usuario en evento: ", error);
            await transaction.rollback();
            res.status(500).json({message: "Error al registrar"});
        }
    }

}

export default EventController;
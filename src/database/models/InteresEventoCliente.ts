import { Model, DataTypes } from "sequelize";
import sequelize from "../mysql";
import Cliente from "./Cliente";
import Evento from "./Evento";
import ItemComercial from "./ItemComercial";

class InteresEventoCliente extends Model {
    public id_interes_evento_cliente!: number;
    public fecha_registro!: Date;
    public fecha_eliminacion!: Date | null;
    public id_cliente!: number;
    public id_evento!: number;
    public id_item_comercial!: number;
}

InteresEventoCliente.init(
    {
        id_interes_evento_cliente: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fecha_registro: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        fecha_eliminacion: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        id_cliente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Cliente",
                key: "id_cliente",
            },
        },
        id_evento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Evento",
                key: "id_evento",
            },
        },
        id_item_comercial: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "ItemComercial",
                key: "id_item_comercial",
            },
        },
    },
    {
        sequelize,
        tableName: "InteresEventoCliente",
        timestamps: false,
    }
);

InteresEventoCliente.belongsTo(Cliente, { foreignKey: "id_cliente" });
InteresEventoCliente.belongsTo(Evento, { foreignKey: "id_evento" });
InteresEventoCliente.belongsTo(ItemComercial, { foreignKey: "id_item_comercial" });

export default InteresEventoCliente;
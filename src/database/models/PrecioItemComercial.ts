import { Model, DataTypes } from "sequelize";
import sequelize from "../mysql";
import ItemComercial from "./ItemComercial";

class PrecioItemComercial extends Model {
    public id_precio_item_comercial!: number;
    public precio!: number;
    public fecha_inicio!: Date;
    public fecha_fin!: Date | null;
    public fecha_registro!: Date;
    public fecha_eliminacion!: Date | null;
    public id_item_comercial!: number;
}

PrecioItemComercial.init(
    {
        id_precio_item_comercial: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            get() {
                const value = this.getDataValue("precio");
                return value ? parseFloat(value as string) : 0;
            },
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        fecha_registro: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_eliminacion: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        id_item_comercial: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "PrecioItemComercial",
        timestamps: false,
    }
);

export default PrecioItemComercial;
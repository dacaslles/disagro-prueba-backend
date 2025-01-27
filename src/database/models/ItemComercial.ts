import { Model, DataTypes } from "sequelize";
import sequelize from "../mysql";
import TipoItemComercial from "./TipoItemComercial";
import PrecioItemComercial from "./PrecioItemComercial";

class ItemComercial extends Model {
    public id_item_comercial!: number;
    public nombre!: string;
    public descripcion!: string;
    public fecha_registro!: Date;
    public fecha_eliminacion!: Date | null;
    public id_tipo_item_comercial!: number;
}

ItemComercial.init(
    {
        id_item_comercial: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        fecha_registro: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_eliminacion: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        id_tipo_item_comercial: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "ItemComercial",
        timestamps: false,
    }
);

ItemComercial.belongsTo(TipoItemComercial, { foreignKey: "id_tipo_item_comercial" });

ItemComercial.hasMany(PrecioItemComercial, {foreignKey: "id_item_comercial"});

export default ItemComercial;
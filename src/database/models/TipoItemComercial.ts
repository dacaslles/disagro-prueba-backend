import { Model, DataTypes } from "sequelize";
import sequelize from "../mysql";

class TipoItemComercial extends Model {
    public id_tipo_item_comercial!: number;
    public nombre!: string;
}

TipoItemComercial.init(
    {
        id_tipo_item_comercial: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "TipoItemComercial",
        timestamps: false,
    }
);

export default TipoItemComercial;
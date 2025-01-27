import { Model, DataTypes } from "sequelize";
import sequelize from "../mysql";

class Usuario extends Model {
    public id_usuario!: number;
    public correo!: string;
    public contrasena!: string;
    public fecha_creacion!: Date;
    public fecha_eliminacion!: Date;
}

Usuario.init(
    {
        id_usuario: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        correo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        contrasena: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        fecha_eliminacion: {
            type: DataTypes.DATE,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: "Usuario",
        timestamps: false,
    }
);

export default Usuario;
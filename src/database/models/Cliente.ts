import { Model, DataTypes } from "sequelize";
import sequelize from "../mysql";
import Usuario from "./Usuario";

class Cliente extends Model {
    public id_cliente!: number;
    public nombres!: string;
    public apellidos!: string;
    public email!: string;
    public telefono!: string | null;
    public direccion!: string | null;
    public fecha_registro!: Date;
    public id_usuario!: number | null;
}

Cliente.init(
    {
        id_cliente: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombres: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        telefono: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        direccion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        fecha_registro: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: true,
            references: {
                model: "Usuario",
                key: "id_usuario",
            },
            onDelete: "SET NULL",
        },
    },
    {
        sequelize,
        tableName: "Cliente",
        timestamps: false,
    }
);

Cliente.belongsTo(Usuario, { foreignKey: "id_usuario", onDelete: "SET NULL" });

export default Cliente;
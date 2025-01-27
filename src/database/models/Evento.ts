import { Model, DataTypes } from "sequelize";
import sequelize from "../mysql";

class Evento extends Model {
    public id_evento!: number;
    public nombre!: string;
    public descripcion!: string;
    public fecha_inicio!: Date;
    public fecha_fin!: Date;
    public ubicacion!: string;
    public estado!: "planeado" | "activo" | "finalizado";
    public fecha_creacion!: Date;
    public fecha_eliminacion!: Date | null;
}

// Definir los campos del modelo
Evento.init(
    {
        id_evento: {
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
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ubicacion: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        estado: {
            type: DataTypes.ENUM("planeado", "activo", "finalizado"),
            allowNull: false,
            defaultValue: "planeado",
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        fecha_eliminacion: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "Evento",
        timestamps: false,
    }
);

export default Evento;
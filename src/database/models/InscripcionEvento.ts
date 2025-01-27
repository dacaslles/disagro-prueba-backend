import { Model, DataTypes } from "sequelize";
import sequelize from "../mysql";
import Cliente from "./Cliente";
import Evento from "./Evento";

class InscripcionEvento extends Model {
    public id_inscripcion_evento!: number;
    public fecha_asistencia!: Date;
    public asistio!: boolean;
    public fecha_registro!: Date;
    public fecha_eliminacion!: Date | null;
    public id_cliente!: number;
    public id_evento!: number;
}

InscripcionEvento.init(
    {
        id_inscripcion_evento: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fecha_asistencia: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        asistio: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
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
    },
    {
        sequelize,
        tableName: "InscripcionEvento",
        timestamps: false,
    }
);

InscripcionEvento.belongsTo(Cliente, { foreignKey: "id_cliente" });
InscripcionEvento.belongsTo(Evento, { foreignKey: "id_evento" });

export default InscripcionEvento;
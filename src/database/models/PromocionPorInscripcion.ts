import { Model, DataTypes } from "sequelize";
import sequelize from "../mysql";
import InscripcionEvento from "./InscripcionEvento";
import PromocionEvento from "./PromocionEvento";

class PromocionPorInscripcion extends Model {
    public id_promocion_por_inscripcion!: number;
    public fecha_registro!: Date;
    public fecha_eliminacion!: Date | null;
    public id_inscripcion_evento!: number;
    public id_promocion_evento!: number;
}

PromocionPorInscripcion.init(
    {
        id_promocion_por_inscripcion: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
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
        id_inscripcion_evento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: InscripcionEvento,
                key: "id_inscripcion_evento",
            },
        },
        id_promocion_evento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: PromocionEvento,
                key: "id_promocion_evento",
            },
        },
    },
    {
        sequelize,
        tableName: "PromocionPorInscripcion",
        timestamps: false, 
    }
);

PromocionPorInscripcion.belongsTo(InscripcionEvento, { foreignKey: "id_inscripcion_evento" });
PromocionPorInscripcion.belongsTo(PromocionEvento, { foreignKey: "id_promocion_evento" });

export default PromocionPorInscripcion;
import { Model, DataTypes } from "sequelize";
import sequelize from "../mysql";
import Evento from "./Evento";
import TipoItemComercial from "./TipoItemComercial";

class PromocionEvento extends Model {
    public id_promocion_evento!: number;
    public nombre!: string;
    public descripcion!: string | null;
    public cantidad_requerida!: number;
    public monto_requerido!: number;
    public mismo_item!: boolean;
    public mismo_tipo!: boolean;
    public tipo_descuento!: "porcentaje" | "descuento_fijo";
    public valor_descuento!: number;
    public fecha_inicio!: Date;
    public fecha_fin!: Date;
    public orden!: number;
    public fecha_registro!: Date;
    public fecha_eliminacion!: Date | null;
    public id_evento!: number;
    public id_tipo_item_comercial!: number;
}

// Definir el modelo en Sequelize
PromocionEvento.init(
    {
        id_promocion_evento: {
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
            allowNull: true,
        },
        cantidad_requerida: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        monto_requerido: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
            get() {
                const value = this.getDataValue("monto_requerido");
                return value ? parseFloat(value as string) : 0;
            },
        },
        mismo_item: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        mismo_tipo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        tipo_descuento: {
            type: DataTypes.ENUM("porcentaje", "descuento_fijo"),
            allowNull: false,
        },
        valor_descuento: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            get() {
                const value = this.getDataValue("valor_descuento");
                return value ? parseFloat(value as string) : 0;
            },
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        fecha_fin: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        orden: {
            type: DataTypes.TINYINT,
            allowNull: false
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
        id_evento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Evento",
                key: "id_evento",
            },
        },
        id_tipo_item_comercial: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "TipoItemComercial",
                key: "id_tipo_item_comercial"
            }
        }
    },
    {
        sequelize,
        tableName: "PromocionEvento",
        timestamps: false,
    }
);

PromocionEvento.belongsTo(Evento, { foreignKey: "id_evento" });
PromocionEvento.belongsTo(TipoItemComercial, {foreignKey: "id_tipo_item_comercial"});

export default PromocionEvento;
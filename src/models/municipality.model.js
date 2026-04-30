import { DataTypes } from "sequelize";
import sequelize from "../config/mysql.config.js";

const Municipality = sequelize.define(
  "Municipality",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "nombre",
    },
    // La FK la maneja solo la asociación, no la definas aquí también
    // para evitar conflictos de mapeo doble
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "departamento_id", // <-- VERIFICA este nombre en tu tabla MySQL con: DESCRIBE municipios;
    },
  },
  {
    tableName: "municipios",
    timestamps: false,
  },
);

export default Municipality;

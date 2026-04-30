import { DataTypes } from "sequelize";
import sequelize from "../config/mysql.config.js";

const Department = sequelize.define(
  "Department",
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
  },
  {
    tableName: "departamentos",
    timestamps: false,
  },
);

export default Department;

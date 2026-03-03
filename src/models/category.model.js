export default (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      id_categoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_categoria", // Nombre de la columna en la tabla
      },
      nombre_categoria: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "nombre_categoria",
        validate: {
          notEmpty: { msg: "El nombre de la categoría es obligatorio" },
        },
      },
      descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "descripcion",
      },
      activo: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        field: "activo",
      },
    },
    {
      tableName: "categorias", // Nombre exacto de la tabla en MySQL
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Category;
};
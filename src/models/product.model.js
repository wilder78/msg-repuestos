export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_producto",
      },
      referencia: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "referencia",
      },
      nombre: {
        type: DataTypes.STRING(150),
        allowNull: false,
        field: "nombre",
      },
      descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "descripcion",
      },
      marca: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "marca",
      },
      modelo: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: "modelo",
      },
      imagen_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "default_producto.png",
        field: "imagen_url",
      },
      precio_buy: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
        field: "precio_compra", // Mapeo exacto a la DB
      },
      stock_buen_estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "stock_Buen_Estado", // Cuidado con las mayúsculas de la imagen
      },
      stock_defectuoso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "stock_Defectuoso",
      },
      id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_categoria",
      },
      activo: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        field: "activo",
      },
    },
    {
      tableName: "productos",
      timestamps: false,
      freezeTableName: true,
    }
  );

  // Definición de la relación con Categorías
  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: "id_categoria",
      as: "categoria",
    });
  };

  return Product;
};
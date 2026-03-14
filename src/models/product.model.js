export default (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      idProducto: {
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
      imagenUrl: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: "default_producto.png",
        field: "imagen_url",
      },
      precioCompra: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
        field: "precio_compra",
      },
      // Corregido según la imagen de la estructura de la base de datos
      stockBuenEstado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "stock_buen_estado",
      },
      // Corregido según la imagen de la estructura de la base de datos
      stockDefectuoso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "stock_defectuoso",
      },
      idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_categoria",
      },
      activo: {
        type: DataTypes.BOOLEAN, // TINYINT(1) se mapea mejor como BOOLEAN
        allowNull: false,
        defaultValue: true,
        field: "activo",
      },
    },
    {
      tableName: "productos",
      timestamps: false,
      freezeTableName: true,
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: "id_categoria",
      as: "categoria",
    });
    
    // Si usas PurchaseDetail, añade la relación inversa aquí si es necesario
    if (models.PurchaseDetail) {
      Product.hasMany(models.PurchaseDetail, {
        foreignKey: "id_producto",
        as: "detallesCompra",
      });
    }
  };

  return Product;
};
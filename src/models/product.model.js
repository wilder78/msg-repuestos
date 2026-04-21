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
      stockBuenEstado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "stock_buen_estado",
      },
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
      // ✅ Atributo actualizado: de 'activo' a 'idEstado'
      idEstado: {
        type: DataTypes.INTEGER, // Cambiado de BOOLEAN a INTEGER
        allowNull: false,
        defaultValue: 1, // 1 suele representar 'Activo'
        field: "id_estado",
      },
    },
    {
      tableName: "productos",
      timestamps: false,
      freezeTableName: true,
    },
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: "id_categoria",
      as: "categoria",
    });

    // Asociación con estados si existe el modelo
    if (models.Estado) {
      Product.belongsTo(models.Estado, {
        foreignKey: "id_estado",
        as: "estado",
      });
    }

    if (models.PurchaseDetail) {
      Product.hasMany(models.PurchaseDetail, {
        foreignKey: "id_producto",
        as: "detallesCompra",
      });
    }
  };

  return Product;
};
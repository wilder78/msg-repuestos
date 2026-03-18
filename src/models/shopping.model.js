export default (sequelize, DataTypes) => {
  const Purchase = sequelize.define(
    "Purchase",
    {
      idCompra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_compra",
      },
      fechaOrden: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "fecha_orden",
      },
      fechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "fecha_registro",
      },
      idProveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_proveedor",
      },
      idEmpleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_empleado",
      },
      estadoCompra: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: "estado_compra",
      },
      total: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0.0,
        field: "total",
      },
      rutaPdf: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "ruta_pdf",
      },
    },
    {
      tableName: "compras",
      timestamps: false,
      freezeTableName: true,
    },
  );

  Purchase.associate = (models) => {
    Purchase.hasMany(models.PurchaseDetail, {
      foreignKey: "id_compra",
      as: "detalles",
    });

    Purchase.belongsTo(models.Supplier, {
      foreignKey: "id_proveedor",
      as: "proveedor",
    });

    Purchase.belongsTo(models.Empleado, {
      foreignKey: "id_empleado",
      as: "empleado",
    });
  };

  return Purchase;
};

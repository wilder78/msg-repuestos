export default (sequelize, DataTypes) => {
  const Purchase = sequelize.define(
    "Purchase",
    {
      id_compra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_compra",
      },
      fecha_orden: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "Fecha_Orden",
      },
      fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "Fecha_Registro",
      },
      id_proveedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_proveedor",
      },
      id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_empleado",
      },
      estado_compra: {
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
      ruta_pdf: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "ruta_pdf",
      },
    },
    {
      tableName: "compras",
      timestamps: false,
      freezeTableName: true,
    }
  );

  Purchase.associate = (models) => {
    // 1. Relación con Detalles (Ya la tenías)
    Purchase.hasMany(models.PurchaseDetail, {
      foreignKey: "id_compra",
      as: "detalles",
    });

    // 2. SOLUCIÓN AL ERROR: Relación con Proveedor (Supplier)
    // Asegúrate de que el modelo en index.model.js se llame 'Supplier'
    Purchase.belongsTo(models.Supplier, {
      foreignKey: "id_proveedor",
      as: "proveedor", // Este alias es el que usará el controlador en el include
    });

    // 3. Relación con Empleado (Recomendado)
    // Asegúrate de que el modelo en index.model.js se llame 'Empleado'
    Purchase.belongsTo(models.Empleado, {
      foreignKey: "id_empleado",
      as: "empleado",
    });
  };

  return Purchase;
};
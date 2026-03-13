export default (sequelize, DataTypes) => {
  const Sale = sequelize.define(
    "Sale",
    {
      idVenta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_venta", // Columna 1
      },
      idPedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_pedido", // Columna 2
      },
      fechaVenta: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "fecha_venta", // Columna 3
      },
      totalVenta: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0.00,
        field: "total_venta", // Columna 4
      },
      idFormaPago: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_forma_pago", // Columna 5
      },
      idEstadoVenta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: "id_estado_venta", // Columna 6
      },
      rutaPdf: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "ruta_PDF", // Columna 7
      },
    },
    {
      tableName: "ventas",
      timestamps: false,
      freezeTableName: true,
    }
  );

  Sale.associate = (models) => {
    // Relación con Devoluciones: Una venta puede originar devoluciones
    if (models.CustomerReturn) {
      Sale.hasMany(models.CustomerReturn, {
        foreignKey: "idVenta",
        as: "devoluciones",
      });
    }
    // Relación con Pedidos
    if (models.Order) {
      Sale.belongsTo(models.Order, {
        foreignKey: "idPedido",
        as: "pedido",
      });
    }
  };

  return Sale;
};
export default (sequelize, DataTypes) => {
  const CustomerReturn = sequelize.define(
    "CustomerReturn",
    {
      idDevolucion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_devolucion",
      },
      idVenta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_venta",
      },
      idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_cliente",
      },
      fechaDevolucion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: "fecha_devolucion",
      },
      idMotivo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_motivo",
      },
      tipoAjuste: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "tipo_ajuste",
      },
      idEstadoDevolucion: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        field: "id_estado_devolucion",
      },
      totalAjuste: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0.0,
        field: "total_ajuste",
      },
    },
    {
      tableName: "devoluciones",
      timestamps: false,
    },
  );

  CustomerReturn.associate = (models) => {
    CustomerReturn.hasMany(models.ReturnDetail, {
      foreignKey: "idDevolucion",
      as: "detalles",
    });

    CustomerReturn.belongsTo(models.Customer, {
      foreignKey: "idCliente",
      as: "cliente",
    });

    if (models.Sale) {
      CustomerReturn.belongsTo(models.Sale, {
        foreignKey: "idVenta",
        as: "venta",
      });
    }
  };

  return CustomerReturn;
};

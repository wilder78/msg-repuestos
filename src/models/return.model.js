export default (sequelize, DataTypes) => {
  const CustomerReturn = sequelize.define("CustomerReturn", {
    idDevolucion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_devolucion" // Columna 1
    },
    idVenta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_venta" // Columna 2
    },
    idCliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_cliente" // Columna 3
    },
    fechaDevolucion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "fecha_devolucion" // Columna 4
    },
    idMotivo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id_motivo" // Columna 5
    },
    tipoAjuste: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "tipo_ajuste" // Columna 6
    },
    idEstadoDevolucion: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      field: "id_estado_devolucion" // Columna 7
    },
    totalAjuste: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0.00,
      field: "total_ajuste" // Columna 8
    }
  }, {
    tableName: "devoluciones", //
    timestamps: false
  });

  CustomerReturn.associate = (models) => {
    // Relación con el detalle: Usamos el alias 'detalles' definido en el controlador
    CustomerReturn.hasMany(models.ReturnDetail, { 
      foreignKey: "idDevolucion", // Apunta al nombre del campo en el modelo ReturnDetail
      as: "detalles" 
    });

    // Relación con el cliente
    CustomerReturn.belongsTo(models.Customer, { 
      foreignKey: "idCliente", 
      as: "cliente" 
    });

    // NUEVA: Relación con Ventas (Para validar la FK que falló)
    if (models.Sale) {
      CustomerReturn.belongsTo(models.Sale, { 
        foreignKey: "idVenta", 
        as: "venta" 
      });
    }
  };

  return CustomerReturn;
};
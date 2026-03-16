export default (sequelize, DataTypes) => {
  const RutaDetail = sequelize.define(
    "RutaDetail",
    {
      idDetalleRuta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_detalle_ruta",
      },
      idRuta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_ruta",
      },
      secuenciaParada: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: "secuencia_parada",
      },
      idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_cliente",
      },
      idPedido: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "id_pedido",
      },
      fechaLlegadaReal: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "fecha_llegada_real",
      },
      fechaSalidaReal: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "fecha_salida_real",
      },
      estadoVisita: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "estado_visita",
        validate: {
          notEmpty: { msg: "El estado de la visita es obligatorio" },
        },
      },
    },
    {
      tableName: "detalle_ruta",
      timestamps: false,
      freezeTableName: true,
    },
  );

  RutaDetail.associate = (models) => {
    // 1. Relación de vuelta hacia la cabecera (Usa models.Ruta definido en index)
    RutaDetail.belongsTo(models.Ruta, {
      foreignKey: "id_ruta",
      as: "cabeceraRuta",
    });

    // 2. Relación con el Cliente (Usa models.Customer definido en index)
    // Esto es vital para poder ver el nombre del cliente en el detalle de la ruta
    RutaDetail.belongsTo(models.Customer, {
      foreignKey: "id_cliente",
      as: "cliente",
    });

    // 3. Relación con el Pedido (Opcional, usa models.Order definido en index)
    RutaDetail.belongsTo(models.Order, {
      foreignKey: "id_pedido",
      as: "pedido",
    });
  };

  return RutaDetail;
};

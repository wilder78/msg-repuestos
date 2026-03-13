export default (sequelize, DataTypes) => {
  const PurchaseDetail = sequelize.define(
    "PurchaseDetail",
    {
      // Definición de Clave Primaria Compuesta (id_compra + id_producto)
      id_compra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: "id_compra",
      },
      id_producto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: "id_producto",
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        field: "cantidad",
      },
      costo_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
        field: "costo_unitario",
      },
      subtotal: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0.00,
        field: "subtotal",
      },
    },
    {
      tableName: "detalle_compra",
      timestamps: false,
      freezeTableName: true, // Mantiene el nombre exacto de la tabla
    }
  );

  // Configuración de Relaciones
  PurchaseDetail.associate = (models) => {
    // Relación con la Compra (Muchos detalles pertenecen a una compra)
    PurchaseDetail.belongsTo(models.Purchase, {
      foreignKey: "id_compra",
      as: "compra",
    });

    // Relación con el Producto (Cada detalle describe un producto/repuesto)
    // Esto te permitirá hacer un "JOIN" para traer el nombre del repuesto
    PurchaseDetail.belongsTo(models.Product, {
      foreignKey: "id_producto",
      as: "producto",
    });
  };

  return PurchaseDetail;
};

// export default (sequelize, DataTypes) => {
//   const PurchaseDetail = sequelize.define(
//     "PurchaseDetail",
//     {
//       // En esta tabla la PK suele ser compuesta o el par de IDs
//       id_compra: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         field: "id_compra",
//       },
//       id_producto: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         field: "id_producto",
//       },
//       cantidad: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         field: "cantidad",
//       },
//       costo_unitario: {
//         type: DataTypes.DECIMAL(10, 2),
//         allowNull: false,
//         field: "costo_unitario",
//       },
//       subtotal: {
//         type: DataTypes.DECIMAL(12, 2),
//         allowNull: false,
//         field: "subtotal",
//       },
//     },
//     {
//       tableName: "detalle_compra",
//       timestamps: false,
//     }
//   );

//   return PurchaseDetail;
// };
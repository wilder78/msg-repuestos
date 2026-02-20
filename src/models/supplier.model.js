export default (sequelize, DataTypes) => {
  const Supplier = sequelize.define(
    "proveedor",
    {
      idProveedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_proveedor",
      },
      idTipoDocumento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_tipo_documento",
        // Eliminamos la referencia explícita aquí para que Sequelize 
        // la maneje únicamente a través de Supplier.associate
      },
      numeroDocumento: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        field: "numero_documento",
        validate: {
          notEmpty: true // Evita que se envíen strings vacíos ""
        }
      },
      nombreEmpresa: {
        type: DataTypes.STRING(150),
        allowNull: false,
        field: "nombre_empresa",
        validate: {
          notEmpty: true
        }
      },
      contacto: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: "contacto",
      },
      telefono: {
        type: DataTypes.STRING(25),
        allowNull: true,
        field: "telefono",
      },
      email: {
        type: DataTypes.STRING(125),
        allowNull: false,
        validate: {
          isEmail: true,
          notNull: { msg: "El email no puede ser nulo" }
        },
        field: "email",
      },
      condicionesComerciales: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: "condiciones_comerciales",
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "activo",
      },
    },
    {
      tableName: "proveedor",
      timestamps: false,
      freezeTableName: true,
    }
  );

  Supplier.associate = (models) => {
    // Es vital que models.TipoDocumento esté definido en el index de modelos
    Supplier.belongsTo(models.TipoDocumento, {
      foreignKey: "id_tipo_documento",
      as: "tipoDocumento", 
    });
  };

  return Supplier;
};

// export default (sequelize, DataTypes) => {
//   const Supplier = sequelize.define(
//     "proveedor",
//     {
//       idProveedor: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         field: "id_proveedor",
//       },
//       idTipoDocumento: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         field: "id_tipo_documento",
//         references: {
//           model: "tipo_documento", // Nombre de la tabla física
//           key: "id_tipo_documento",
//         },
//       },
//       numeroDocumento: {
//         type: DataTypes.STRING(20),
//         allowNull: false,
//         unique: true,
//         field: "numero_documento",
//       },
//       nombreEmpresa: {
//         type: DataTypes.STRING(150),
//         allowNull: false,
//         field: "nombre_empresa",
//       },
//       contacto: {
//         type: DataTypes.STRING(100),
//         allowNull: true,
//         field: "contacto",
//       },
//       telefono: {
//         type: DataTypes.STRING(25),
//         allowNull: true,
//         field: "telefono",
//       },
//       email: {
//         type: DataTypes.STRING(125),
//         allowNull: false,
//         validate: {
//           isEmail: true,
//         },
//         field: "email",
//       },
//       condicionesComerciales: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//         field: "condiciones_comerciales",
//       },
//       activo: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: true,
//         field: "activo",
//       },
//     },
//     {
//       tableName: "proveedor",
//       timestamps: false,
//       freezeTableName: true,
//     }
//   );

//   // Definición de asociaciones
//   Supplier.associate = (models) => {
//     Supplier.belongsTo(models.TipoDocumento, {
//       foreignKey: "id_tipo_documento",
//       as: "tipoDocumento", // Alias para usar en los includes de Sequelize
//     });
//   };

//   return Supplier;
// };
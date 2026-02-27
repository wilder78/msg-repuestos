export default (sequelize, DataTypes) => {
  const Supplier = sequelize.define(
    "Supplier", // Nombre interno del modelo
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
      },
      numeroDocumento: {
        type: DataTypes.STRING(15), // Ajustado a varchar(15) según tu DB
        allowNull: false,
        unique: true,
        field: "numero_documento",
        validate: {
          notEmpty: true 
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
        type: DataTypes.STRING(15), // Ajustado a varchar(15) según tu DB
        allowNull: true,
        field: "telefono",
      },
      email: {
        type: DataTypes.STRING(100), // Ajustado a varchar(100) según tu DB
        allowNull: false,
        validate: {
          isEmail: true,
          notNull: { msg: "El email no puede ser nulo" }
        },
        field: "email",
      },
      condicionesComerciales: {
        type: DataTypes.STRING(500), // Ajustado a varchar(500) según tu DB
        allowNull: true,
        field: "condiciones_comerciales",
      },
      activo: {
        type: DataTypes.BOOLEAN, // Mapea con tinyint(1) de tu DB
        allowNull: false,
        defaultValue: true,
        field: "activo",
      },
    },
    {
      // CAMBIO PRINCIPAL: Ahora apunta a la tabla que ya existe y tiene relaciones
      tableName: "proveedores", 
      timestamps: false,
      freezeTableName: true, // Evita que Sequelize intente cambiar el nombre
    }
  );

  Supplier.associate = (models) => {
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
//         // Eliminamos la referencia explícita aquí para que Sequelize 
//         // la maneje únicamente a través de Supplier.associate
//       },
//       numeroDocumento: {
//         type: DataTypes.STRING(20),
//         allowNull: false,
//         unique: true,
//         field: "numero_documento",
//         validate: {
//           notEmpty: true // Evita que se envíen strings vacíos ""
//         }
//       },
//       nombreEmpresa: {
//         type: DataTypes.STRING(150),
//         allowNull: false,
//         field: "nombre_empresa",
//         validate: {
//           notEmpty: true
//         }
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
//           notNull: { msg: "El email no puede ser nulo" }
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

//   Supplier.associate = (models) => {
//     // Es vital que models.TipoDocumento esté definido en el index de modelos
//     Supplier.belongsTo(models.TipoDocumento, {
//       foreignKey: "id_tipo_documento",
//       as: "tipoDocumento", 
//     });
//   };

//   return Supplier;
// };

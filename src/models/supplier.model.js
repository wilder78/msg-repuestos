export default (sequelize, DataTypes) => {
  const Supplier = sequelize.define(
    "Supplier",
    {
      id_proveedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_proveedor",
      },
      // Cambiado de idTipoDocumento a id_tipo_documento
      id_tipo_documento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_tipo_documento",
        validate: {
          notNull: { msg: "El tipo de documento es obligatorio" }
        }
      },
      // Cambiado de numeroDocumento a numero_documento
      numero_documento: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        field: "numero_documento",
        validate: {
          notEmpty: { msg: "El número de documento no puede estar vacío" }
        }
      },
      // Cambiado de nombreEmpresa a nombre_empresa
      nombre_empresa: {
        type: DataTypes.STRING(150),
        allowNull: false,
        field: "nombre_empresa",
        validate: {
          notEmpty: { msg: "El nombre de la empresa es obligatorio" }
        }
      },
      contacto: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: "contacto",
      },
      telefono: {
        type: DataTypes.STRING(15),
        allowNull: true,
        field: "telefono",
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true, // Según tu DB (image_619e7b.png) permite nulos
        field: "email",
        validate: {
          isEmail: { msg: "Debe ser un correo electrónico válido" }
        }
      },
      condiciones_comerciales: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "condiciones_comerciales",
      },
      activo: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        field: "activo",
      },
    },
    {
      tableName: "proveedores", 
      timestamps: false,
      freezeTableName: true, 
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

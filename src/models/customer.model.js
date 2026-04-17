export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      idCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_cliente",
      },
      idTipoDocumento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_tipo_documento",
        validate: {
          notNull: { msg: "El tipo de documento es obligatorio." },
          isInt: { msg: "El tipo de documento debe ser un valor numérico." },
        },
      },
      numeroDocumento: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        field: "numero_documento",
        validate: {
          notEmpty: { msg: "El número de documento es obligatorio." },
          len: {
            args: [5, 15],
            msg: "El documento debe tener entre 5 y 15 caracteres.",
          },
        },
      },
      razonSocial: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: "razon_social",
        validate: {
          notEmpty: { msg: "La razón social o nombre es obligatorio." },
        },
      },
      personaContacto: {
        type: DataTypes.STRING(150),
        allowNull: true, // Permitimos nulo según tu DB
        field: "persona_contacto",
      },
      direccion: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "direccion",
        validate: {
          notEmpty: { msg: "La dirección es obligatoria." },
        },
      },
      telefono: {
        type: DataTypes.STRING(15),
        allowNull: false,
        field: "telefono",
        validate: {
          notEmpty: { msg: "El teléfono de contacto es obligatorio." },
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: "email",
        validate: {
          isEmail: { msg: "Debe ingresar un correo electrónico válido." },
        },
      },
      tipoCliente: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "tipo_cliente",
        defaultValue: "General",
      },
      cupoCredito: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
        field: "cupo_credito",
        validate: {
          isDecimal: true,
          min: { args: [0], msg: "El cupo de crédito no puede ser negativo." },
        },
      },
      idEstado: {
        type: DataTypes.TINYINT(1), // Coincide con tinyint(1) de tu DB
        allowNull: false,
        defaultValue: 1,
        field: "id_estado",
      },
      idZona: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_zona",
        validate: {
          notNull: { msg: "La zona es obligatoria." },
        },
      },
      fechaRegistro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "fecha_registro",
      },
    },
    {
      tableName: "clientes",
      timestamps: false,
      freezeTableName: true,
    },
  );

  Customer.associate = (models) => {
    // Asociación con Tipo de Documento
    if (models.TipoDocumento) {
      Customer.belongsTo(models.TipoDocumento, {
        foreignKey: "idTipoDocumento",
        as: "tipoDocumento",
      });
    }

    // Asociación con Zona
    if (models.Zona) {
      Customer.belongsTo(models.Zona, {
        foreignKey: "idZona",
        as: "zona",
      });
    }
  };

  return Customer;
};

// export default (sequelize, DataTypes) => {
//   const Customer = sequelize.define(
//     "Customer",
//     {
//       idCliente: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         field: "id_cliente",
//       },
//       idTipoDocumento: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         field: "id_tipo_documento",
//         validate: {
//           notNull: { msg: "El tipo de documento es obligatorio." },
//         },
//       },
//       numeroDocumento: {
//         type: DataTypes.STRING(15),
//         allowNull: false,
//         unique: true,
//         field: "numero_documento",
//         validate: {
//           notEmpty: { msg: "El número de documento es obligatorio." },
//         },
//       },
//       razonSocial: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//         field: "razon_social",
//         validate: {
//           notEmpty: { msg: "La razón social es obligatoria." },
//         },
//       },
//       direccion: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//         field: "direccion",
//       },
//       telefono: {
//         type: DataTypes.STRING(15),
//         allowNull: false,
//         field: "telefono",
//       },
//       email: {
//         type: DataTypes.STRING(100),
//         allowNull: true,
//         field: "email",
//         validate: {
//           isEmail: { msg: "Debe ser un correo electrónico válido." },
//         },
//       },
//       tipoCliente: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//         field: "tipo_cliente",
//       },
//       cupoCredito: {
//         type: DataTypes.DECIMAL(10, 2),
//         allowNull: false,
//         defaultValue: 0.0,
//         field: "cupo_credito",
//       },
//       activo: {
//         type: DataTypes.TINYINT(1),
//         allowNull: false,
//         defaultValue: 1,
//         field: "activo",
//       },
//       idZona: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         field: "id_zona",
//       },
//     },
//     {
//       tableName: "clientes",
//       timestamps: false,
//       freezeTableName: true,
//     },
//   );

//   Customer.associate = (models) => {
//     if (models.TipoDocumento) {
//       Customer.belongsTo(models.TipoDocumento, {
//         foreignKey: "idTipoDocumento",
//         as: "tipoDocumento",
//       });
//     }
//   };

//   return Customer;
// };

export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      idCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_cliente", // Columna 1 en tu DB
      },
      idTipoDocumento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_tipo_documento", // Columna 2 en tu DB
        validate: {
          notNull: { msg: "El tipo de documento es obligatorio." },
        },
      },
      numeroDocumento: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        field: "numero_documento", // Columna 3 en tu DB
        validate: {
          notEmpty: { msg: "El número de documento es obligatorio." },
        },
      },
      razonSocial: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: "razon_social", // Columna 4 en tu DB
        validate: {
          notEmpty: { msg: "La razón social es obligatoria." },
        },
      },
      direccion: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "direccion", // Columna 5 en tu DB
      },
      telefono: {
        type: DataTypes.STRING(15),
        allowNull: false,
        field: "telefono", // Columna 6 en tu DB
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: "email", // Columna 7 en tu DB (Permite Nulos)
        validate: {
          isEmail: { msg: "Debe ser un correo electrónico válido." },
        },
      },
      tipoCliente: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "tipo_cliente", // Columna 8 en tu DB
      },
      cupoCredito: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
        field: "cupo_credito", // Columna 9 en tu DB
      },
      activo: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        field: "activo", // Columna 10 en tu DB
      },
      idZona: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_zona", // Columna 11 en tu DB
      },
    },
    {
      tableName: "clientes", // Nombre exacto de tu tabla
      timestamps: false,
      freezeTableName: true,
    },
  );

  // Definición de asociaciones (Crucial para el controlador)
  Customer.associate = (models) => {
    if (models.TipoDocumento) {
      Customer.belongsTo(models.TipoDocumento, {
        foreignKey: "idTipoDocumento",
        as: "tipoDocumento",
      });
    }
  };

  return Customer;
};

// export default (sequelize, DataTypes) => {
//   const Customer = sequelize.define(
//     "Customer",
//     {
//       // Propiedad igual a la DB para evitar errores en Postman
//       ID_Cliente: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         field: "ID_Cliente",
//       },
//       ID_Tipo_Documento: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         field: "ID_Tipo_Documento",
//         validate: {
//           notNull: { msg: "El tipo de documento es obligatorio" }
//         }
//       },
//       Numero_Documento: {
//         type: DataTypes.STRING(15), // Ajustado a varchar(15) según tu DB
//         allowNull: false,
//         unique: true,
//         field: "Numero_Documento",
//         validate: {
//           notEmpty: { msg: "El número de documento es obligatorio" }
//         }
//       },
//       Razon_social: {
//         type: DataTypes.STRING(200), // Ajustado a varchar(200) según tu DB
//         allowNull: false,
//         field: "Razon_social",
//         validate: {
//           notEmpty: { msg: "La razón social es obligatoria" }
//         }
//       },
//       Direccion: {
//         type: DataTypes.STRING(255),
//         allowNull: false, // En tu DB dice Nulo: No
//         field: "Direccion",
//       },
//       Telefono: {
//         type: DataTypes.STRING(15), // Ajustado a varchar(15) según tu DB
//         allowNull: false, // En tu DB dice Nulo: No
//         field: "Telefono",
//       },
//       email: {
//         type: DataTypes.STRING(100), // Ajustado a varchar(100) según tu DB
//         allowNull: true, // En tu DB dice Nulo: Sí (NULL)
//         field: "email",
//         validate: {
//           isEmail: { msg: "Debe ser un correo electrónico válido" }
//         }
//       },
//       Tipo_Cliente: {
//         type: DataTypes.STRING(50),
//         allowNull: false, // En tu DB dice Nulo: No
//         field: "Tipo_Cliente",
//       },
//       Cupo_Credito: {
//         type: DataTypes.DECIMAL(10, 2), // Ajustado a decimal(10,2) según tu DB
//         allowNull: false,
//         defaultValue: 0.00,
//         field: "Cupo_Credito",
//       },
//       Activo: {
//         type: DataTypes.TINYINT(1),
//         allowNull: false,
//         defaultValue: 1,
//         field: "Activo",
//       },
//       ID_Zona: {
//         type: DataTypes.INTEGER,
//         allowNull: false, // En tu DB dice Nulo: No
//         field: "ID_Zona",
//       },
//     },
//     {
//       tableName: "clientes", // Nombre de la tabla en singular como muestra tu DB
//       timestamps: false,
//       freezeTableName: true,
//     }
//   );

//   Customer.associate = (models) => {
//     Customer.belongsTo(models.TipoDocumento, {
//       foreignKey: "ID_Tipo_Documento",
//       as: "tipoDocumento",
//     });

//     // Descomenta esto cuando el modelo Zona esté listo
//     /*
//     Customer.belongsTo(models.Zona, {
//       foreignKey: "ID_Zona",
//       as: "zona",
//     });
//     */
//   };

//   return Customer;
// };

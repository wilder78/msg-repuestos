export default (sequelize, DataTypes) => {
  const Zona = sequelize.define(
    "Zona", // Nombre del modelo en el código
    {
      idZona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_zona", 
      },
      nombreZona: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "nombre_zona", // Ajustado a snake_case para consistencia
        validate: {
          notEmpty: { msg: "El nombre de la zona es obligatorio" }
        }
      },
      descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "descripcion", 
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "activo", 
      },
    },
    {
      // CONEXIÓN CLAVE: Apuntamos a la tabla pluralizada de la base de datos
      tableName: "zonas", 
      timestamps: false,
      freezeTableName: true, // Evita que Sequelize intente renombrarla
    }
  );

  Zona.associate = (models) => {
    // Aquí puedes añadir las asociaciones cuando tus otros modelos estén listos
    /*
    Zona.hasMany(models.Cliente, {
      foreignKey: "id_zona", 
      as: "clientes",
    });
    */
  };

  return Zona;
};

// export default (sequelize, DataTypes) => {
//   const Zona = sequelize.define(
//     "zona",
//     {
//       idZona: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         field: "id_zona", 
//       },
//       nombreZona: {
//         type: DataTypes.STRING(100),
//         allowNull: false,
//         field: "Nombre_Zona", 
//         validate: {
//           notEmpty: { msg: "El nombre de la zona es obligatorio" }
//         }
//       },
//       descripcion: {
//         type: DataTypes.STRING(255),
//         allowNull: true,
//         field: "Descripcion", 
//       },
//       activo: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: true,
//         field: "Activo", 
//       },
//     },
//     {
//       tableName: "zona",
//       timestamps: false,
//       freezeTableName: true,
//     }
//   );

//   Zona.associate = (models) => {
//     // COMENTADO HASTA QUE EL ARCHIVO customer.model.js ESTÉ CREADO E IMPORTADO EN EL BARRIL
//     /*
//     Zona.hasMany(models.Cliente, {
//       foreignKey: "ID_Zona", 
//       as: "clientes",
//     });
//     */
//   };

//   return Zona;
// };

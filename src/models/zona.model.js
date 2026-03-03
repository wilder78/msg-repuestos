export default (sequelize, DataTypes) => {
  const Zona = sequelize.define(
    "Zona",
    {
      id_zona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_zona",
      },
      // Cambiado a Nombre_Zona para que Postman lo reconozca directamente
      Nombre_Zona: {
        type: DataTypes.STRING(50), // Ajustado a 50 según tu captura de DB
        allowNull: false,
        field: "Nombre_Zona", // Debe coincidir con la columna en MySQL (Case Sensitive)
        validate: {
          notEmpty: { msg: "El nombre de la zona es obligatorio" },
        },
      },
      // Cambiado a Descripcion (con D mayúscula si así lo usas en Postman)
      Descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "Descripcion",
      },
      // Cambiado a Activo
      Activo: {
        type: DataTypes.TINYINT(1), // En MySQL es tinyint(1)
        allowNull: false,
        defaultValue: 1,
        field: "Activo",
      },
    },
    {
      tableName: "zonas",
      timestamps: false,
      freezeTableName: true,
    },
  );

  Zona.associate = (models) => {
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
//     "Zona", // Nombre del modelo en el código
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
//         field: "nombre_zona", // Ajustado a snake_case para consistencia
//         validate: {
//           notEmpty: { msg: "El nombre de la zona es obligatorio" }
//         }
//       },
//       descripcion: {
//         type: DataTypes.STRING(255),
//         allowNull: true,
//         field: "descripcion",
//       },
//       activo: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: true,
//         field: "activo",
//       },
//     },
//     {
//       // CONEXIÓN CLAVE: Apuntamos a la tabla pluralizada de la base de datos
//       tableName: "zonas",
//       timestamps: false,
//       freezeTableName: true, // Evita que Sequelize intente renombrarla
//     }
//   );

//   Zona.associate = (models) => {
//     // Aquí puedes añadir las asociaciones cuando tus otros modelos estén listos
//     /*
//     Zona.hasMany(models.Cliente, {
//       foreignKey: "id_zona",
//       as: "clientes",
//     });
//     */
//   };

//   return Zona;
// };

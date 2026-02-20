export default (sequelize, DataTypes) => {
  const Zona = sequelize.define(
    "zona",
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
        field: "Nombre_Zona", 
        validate: {
          notEmpty: { msg: "El nombre de la zona es obligatorio" }
        }
      },
      descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "Descripcion", 
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "Activo", 
      },
    },
    {
      tableName: "zona",
      timestamps: false,
      freezeTableName: true,
    }
  );

  Zona.associate = (models) => {
    // COMENTADO HASTA QUE EL ARCHIVO customer.model.js ESTÉ CREADO E IMPORTADO EN EL BARRIL
    /*
    Zona.hasMany(models.Cliente, {
      foreignKey: "ID_Zona", 
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
//         field: "id_zona", // Minúsculas según la imagen
//       },
//       nombreZona: {
//         type: DataTypes.STRING(100),
//         allowNull: false,
//         field: "Nombre_Zona", // CamelCase según la imagen
//         validate: {
//           notEmpty: { msg: "El nombre de la zona es obligatorio" }
//         }
//       },
//       descripcion: {
//         type: DataTypes.STRING(255),
//         allowNull: true,
//         field: "Descripcion", // Inicia con mayúscula
//       },
//       activo: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//         defaultValue: true,
//         field: "Activo", // Inicia con mayúscula
//       },
//     },
//     {
//       tableName: "zona",
//       timestamps: false,
//       freezeTableName: true,
//     }
//   );

//   Zona.associate = (models) => {
//     // Relación: Una zona tiene muchos clientes
//     Zona.hasMany(models.Cliente, {
//       foreignKey: "ID_Zona", // Debe coincidir con la FK en la tabla cliente
//       as: "clientes",
//     });
//   };

//   return Zona;
// };
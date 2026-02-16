export default (sequelize, DataTypes) => {
  const Rol = sequelize.define(
    "Rol", // Nombre del modelo
    {
      idRol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_rol",
      },
      nombreRol: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        field: "nombre_rol",
      },
      idEstado: {
        // Cambiado a INTEGER si TINYINT da problemas en ciertos dialectos
        type: DataTypes.INTEGER, 
        allowNull: false,
        defaultValue: 1,
        field: "id_estado",
      },
    },
    {
      tableName: "roles", // Asegúrate que en tu DB la tabla se llame 'roles'
      timestamps: false,
      freezeTableName: true,
    }
  );

  Rol.associate = (models) => {
    // Asegúrate de que el modelo Usuario esté importado con el nombre exacto "Usuario"
    if (models.Usuario) {
      Rol.hasMany(models.Usuario, {
        foreignKey: "id_rol", // Usamos el nombre de la columna en la DB
        as: "usuarios",
      });
    }
  };

  return Rol;
};


// export default (sequelize, DataTypes) => {
//   const Rol = sequelize.define(
//     "Rol",
//     {
//       idRol: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         field: "id_rol",
//       },
//       nombreRol: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//         unique: true,
//         field: "nombre_rol",
//       },
//       idEstado: {
//         type: DataTypes.TINYINT(1),
//         allowNull: false,
//         defaultValue: 1,
//         field: "id_estado",
//       },
//     },
//     {
//       tableName: "roles", // <--- CAMBIO AQUÍ: Nombre exacto de tu tabla en la DB
//       timestamps: false,
//       freezeTableName: true, // Esto evita que Sequelize intente pluralizar por su cuenta
//     },
//   );

//   Rol.associate = (models) => {
//     Rol.hasMany(models.Usuario, {
//       foreignKey: "idRol",
//       as: "usuarios",
//     });
//   };

//   return Rol;
// };

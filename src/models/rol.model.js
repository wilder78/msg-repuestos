export default (sequelize, DataTypes) => {
  const Rol = sequelize.define(
    "Rol",
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
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        field: "id_estado",
      },
    },
    {
      tableName: "roles", // <--- CAMBIO AQUÍ: Nombre exacto de tu tabla en la DB
      timestamps: false,
      freezeTableName: true, // Esto evita que Sequelize intente pluralizar por su cuenta
    },
  );

  Rol.associate = (models) => {
    Rol.hasMany(models.Usuario, {
      foreignKey: "idRol",
      as: "usuarios",
    });
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
//         field: "id_estado", // Según tu imagen, es tinyint(1)
//       },
//     },
//     {
//       tableName: "rol",
//       timestamps: false,
//       freezeTableName: true,
//     }
//   );

//   Rol.associate = (models) => {
//     Rol.hasMany(models.Usuario, {
//       foreignKey: "idRol",
//       as: "usuarios",
//     });
//   };

//   return Rol;
// };

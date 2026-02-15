export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "usuario",
    {
      idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_usuario",
      },
      nombreUsuario: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "nombre_usuario",
      },
      email: {
        type: DataTypes.STRING(125),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        field: "email",
      },
      passwordHash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "password_hash",
      },
      idEstado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: "id_estado",
      },
      fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "fecha_creacion",
      },
      idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_rol",
      },
      idCliente: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "id_cliente",
      },
    },
    {
      tableName: "usuario",
      timestamps: false,
      freezeTableName: true,
    }
  );

  // ASOCIACIONES ELIMINADAS - solo dejamos el modelo sin relaciones
  User.associate = (models) => {
    // Vacío por ahora, o elimina esta función completamente
  };

  return User;
};

// export default (sequelize, DataTypes) => {
//   const User = sequelize.define(
//     "usuario",
//     {
//       idUsuario: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         field: "id_usuario",
//       },
//       nombreUsuario: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//         field: "nombre_usuario",
//       },
//       // 📧 NUEVA COLUMNA SEGÚN TU CAPTURA
//       email: {
//         type: DataTypes.STRING(125), // Ajustado a varchar(125) como tu imagen
//         allowNull: false,
//         unique: true,
//         validate: {
//           isEmail: true,
//         },
//         field: "email",
//       },
//       passwordHash: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//         field: "password_hash",
//       },
//       idEstado: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 1,
//         field: "id_estado",
//       },
//       fechaCreacion: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: DataTypes.NOW,
//         field: "fecha_creacion",
//       },
//       idRol: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         field: "id_rol",
//       },
//       idCliente: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         field: "id_cliente",
//       },
//     },
//     {
//       tableName: "usuario",
//       timestamps: false,
//       freezeTableName: true,
//     }
//   );

//   User.associate = (models) => {
//     User.belongsTo(models.Rol, { foreignKey: "id_rol", as: "rol" });
//     User.belongsTo(models.Estado, { foreignKey: "id_estado", as: "estado" });
//     if (models.Cliente) {
//       User.belongsTo(models.Cliente, { foreignKey: "id_cliente", as: "cliente" });
//     }
//   };

//   return User;
// };
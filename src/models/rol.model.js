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
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: "id_estado",
      },
    },
    {
      tableName: "roles",
      timestamps: false,
      freezeTableName: true,
    },
  );

  Rol.associate = (models) => {
    if (models.Usuario) {
      Rol.hasMany(models.Usuario, {
        foreignKey: "id_rol",
        as: "usuarios",
      });
    }
  };

  return Rol;
};

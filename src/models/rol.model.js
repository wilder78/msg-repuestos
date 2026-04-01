export default (sequelize, DataTypes) => {
  const Rol = sequelize.define(
    "Rol",
    {
      idRol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_rol", // Mapeo a DB
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
    // 1. Relación Uno a Muchos con Usuarios
    // Nota: El foreignKey "idRol" debe existir como atributo en usuario.model.js
    if (models.Usuario) {
      Rol.hasMany(models.Usuario, {
        foreignKey: "idRol",
        as: "usuarios",
      });
    }

    // 2. Relación Muchos a Muchos con Permisos (vía tabla intermedia)
    // Usamos los nombres de los atributos de role_permission.model.js
    if (models.Permission && models.RolePermission) {
      Rol.belongsToMany(models.Permission, {
        through: models.RolePermission,
        foreignKey: "idRol", // Atributo 'idRol' en RolePermission
        otherKey: "idPermiso", // Atributo 'idPermiso' en RolePermission
        as: "permisos",
      });
    }
  };

  return Rol;
};

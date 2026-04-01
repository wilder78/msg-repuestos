export default (sequelize, DataTypes) => {
  const RolePermission = sequelize.define(
    "RolePermission",
    {
      idRolesPermisos: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_roles_permisos",
      },
      idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_rol",
        // Se elimina el bloque 'references' manual para evitar duplicidad
      },
      idPermiso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_permiso",
        // Se elimina el bloque 'references' manual para evitar duplicidad
      },
    },
    {
      tableName: "roles_permisos",
      timestamps: false,
      freezeTableName: true,
    },
  );

  RolePermission.associate = (models) => {
    // IMPORTANTE: foreignKey debe apuntar al nombre del atributo (idRol), no al field.
    RolePermission.belongsTo(models.Rol, {
      foreignKey: "idRol",
      as: "rol",
    });

    RolePermission.belongsTo(models.Permission, {
      foreignKey: "idPermiso",
      as: "permiso",
    });
  };

  return RolePermission;
};

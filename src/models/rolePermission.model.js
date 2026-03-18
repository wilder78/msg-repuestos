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
        references: {
          model: "roles",
          key: "id_rol",
        },
      },
      idPermiso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_permiso",
        references: {
          model: "permisos",
          key: "id_permiso",
        },
      },
    },
    {
      tableName: "roles_permisos",
      timestamps: false,
      freezeTableName: true,
    }
  );

  RolePermission.associate = (models) => {
    // Relación con Rol
    RolePermission.belongsTo(models.Rol, {
      foreignKey: "id_rol",
      as: "rol",
    });

    // Relación con Permiso
    RolePermission.belongsTo(models.Permission, {
      foreignKey: "id_permiso",
      as: "permiso",
    });
  };

  return RolePermission;
};
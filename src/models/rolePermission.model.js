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
      },
      idPermiso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_permiso",
      },
      // NUEVO CAMPO: Registro de fecha
      fechaAsignacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Se genera automáticamente al insertar
        field: "fecha_asignacion",
      },
    },
    {
      tableName: "roles_permisos",
      timestamps: false, // Lo mantenemos en false para controlar manualmente la columna
      freezeTableName: true,
    },
  );

  RolePermission.associate = (models) => {
    // Asociación con Rol
    RolePermission.belongsTo(models.Rol, {
      foreignKey: "idRol", // Atributo definido arriba
      as: "rol",
    });

    // Asociación con Permission
    RolePermission.belongsTo(models.Permission, {
      foreignKey: "idPermiso", // Atributo definido arriba
      as: "permiso",
    });
  };

  return RolePermission;
};

export default (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    "Permission",
    {
      idPermiso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_permiso", // Mapeo físico en DB
      },
      nombrePermiso: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "nombre_permiso",
      },
      modulo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "modulo",
      },
      descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "descripcion",
      },
    },
    {
      tableName: "permisos",
      timestamps: false,
      freezeTableName: true,
    },
  );

  Permission.associate = (models) => {
    // CORRECCIÓN DE CLAVES:
    // foreignKey: Es la llave de ESTE modelo (Permission) en la tabla intermedia.
    // otherKey: Es la llave del OTRO modelo (Rol) en la tabla intermedia.
    Permission.belongsToMany(models.Rol, {
      through: models.RolePermission,
      foreignKey: "idPermiso", // Debe coincidir con el ATRIBUTO en RolePermission
      otherKey: "idRol", // Debe coincidir con el ATRIBUTO en RolePermission
      as: "roles",
    });
  };

  return Permission;
};

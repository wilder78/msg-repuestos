export default (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    "Permission",
    {
      idPermiso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_permiso",
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
    Permission.belongsToMany(models.Rol, {
      through: models.RolePermission,
      foreignKey: "id_permiso",
      otherKey: "id_rol",
      as: "roles",
    });
  };

  return Permission;
};

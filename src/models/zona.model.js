export default (sequelize, DataTypes) => {
  const Zona = sequelize.define(
    "Zona",
    {
      idZona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_zona",
      },
      nombreZona: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "nombre_zona",
        validate: {
          notEmpty: { msg: "El nombre de la zona es obligatorio" },
        },
      },
      descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "descripcion",
      },
      activo: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        field: "activo",
      },
    },
    {
      tableName: "zonas",
      timestamps: false,
      freezeTableName: true,
    },
  );

  Zona.associate = (models) => {
    if (models.Customer) {
      Zona.hasMany(models.Customer, {
        foreignKey: "id_zona",
        as: "clientes",
      });
    }
  };

  return Zona;
};

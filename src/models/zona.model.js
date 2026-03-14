export default (sequelize, DataTypes) => {
  const Zona = sequelize.define(
    "Zona",
    {
      idZona: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_zona", // Coincide con la PK en la imagen
      },
      nombreZona: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "nombre_zona", // En la imagen está todo en minúsculas
        validate: {
          notEmpty: { msg: "El nombre de la zona es obligatorio" },
        },
      },
      descripcion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "descripcion", // En minúsculas según la imagen
      },
      activo: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        field: "activo", // En minúsculas según la imagen
      },
    },
    {
      tableName: "zonas",
      timestamps: false,
      freezeTableName: true,
    },
  );

  Zona.associate = (models) => {
    // Aquí puedes habilitar las relaciones cuando depuremos Clientes
    /*
    Zona.hasMany(models.Cliente, {
      foreignKey: "id_zona", 
      as: "clientes",
    });
    */
  };

  return Zona;
};

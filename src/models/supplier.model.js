export default (sequelize, DataTypes) => {
  const Supplier = sequelize.define(
    "Supplier",
    {
      id_proveedor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_proveedor",
      },

      id_tipo_documento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_tipo_documento",
        validate: {
          notNull: { msg: "El tipo de documento es obligatorio" },
        },
      },

      numero_documento: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        field: "numero_documento",
        validate: {
          notEmpty: { msg: "El número de documento no puede estar vacío" },
        },
      },

      nombre_empresa: {
        type: DataTypes.STRING(150),
        allowNull: false,
        field: "nombre_empresa",
        validate: {
          notEmpty: { msg: "El nombre de la empresa es obligatorio" },
        },
      },
      contacto: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: "contacto",
      },
      telefono: {
        type: DataTypes.STRING(15),
        allowNull: true,
        field: "telefono",
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: "email",
        validate: {
          isEmail: { msg: "Debe ser un correo electrónico válido" },
        },
      },
      condiciones_comerciales: {
        type: DataTypes.STRING(500),
        allowNull: true,
        field: "condiciones_comerciales",
      },
      activo: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        field: "activo",
      },
    },
    {
      tableName: "proveedores",
      timestamps: false,
      freezeTableName: true,
    },
  );

  Supplier.associate = (models) => {
    Supplier.belongsTo(models.TipoDocumento, {
      foreignKey: "id_tipo_documento",
      as: "tipoDocumento",
    });
  };

  return Supplier;
};

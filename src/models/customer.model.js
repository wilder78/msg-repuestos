export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      idCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_cliente",
      },
      idTipoDocumento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_tipo_documento",
        validate: {
          notNull: { msg: "El tipo de documento es obligatorio." },
        },
      },
      numeroDocumento: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        field: "numero_documento",
        validate: {
          notEmpty: { msg: "El número de documento es obligatorio." },
        },
      },
      razonSocial: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: "razon_social",
        validate: {
          notEmpty: { msg: "La razón social es obligatoria." },
        },
      },
      direccion: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "direccion",
      },
      telefono: {
        type: DataTypes.STRING(15),
        allowNull: false,
        field: "telefono",
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: "email",
        validate: {
          isEmail: { msg: "Debe ser un correo electrónico válido." },
        },
      },
      tipoCliente: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "tipo_cliente",
      },
      cupoCredito: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
        field: "cupo_credito",
      },
      activo: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        field: "activo",
      },
      idZona: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_zona",
      },
    },
    {
      tableName: "clientes",
      timestamps: false,
      freezeTableName: true,
    },
  );

  Customer.associate = (models) => {
    if (models.TipoDocumento) {
      Customer.belongsTo(models.TipoDocumento, {
        foreignKey: "idTipoDocumento",
        as: "tipoDocumento",
      });
    }
  };

  return Customer;
};

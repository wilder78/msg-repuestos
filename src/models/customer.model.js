export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      idCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_cliente", // Columna 1 en tu DB
      },
      idTipoDocumento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_tipo_documento", // Columna 2 en tu DB
        validate: {
          notNull: { msg: "El tipo de documento es obligatorio." },
        },
      },
      numeroDocumento: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
        field: "numero_documento", // Columna 3 en tu DB
        validate: {
          notEmpty: { msg: "El número de documento es obligatorio." },
        },
      },
      razonSocial: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: "razon_social", // Columna 4 en tu DB
        validate: {
          notEmpty: { msg: "La razón social es obligatoria." },
        },
      },
      direccion: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "direccion", // Columna 5 en tu DB
      },
      telefono: {
        type: DataTypes.STRING(15),
        allowNull: false,
        field: "telefono", // Columna 6 en tu DB
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: "email", // Columna 7 en tu DB (Permite Nulos)
        validate: {
          isEmail: { msg: "Debe ser un correo electrónico válido." },
        },
      },
      tipoCliente: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "tipo_cliente", // Columna 8 en tu DB
      },
      cupoCredito: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
        field: "cupo_credito", // Columna 9 en tu DB
      },
      activo: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        field: "activo", // Columna 10 en tu DB
      },
      idZona: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_zona", // Columna 11 en tu DB
      },
    },
    {
      tableName: "clientes", // Nombre exacto de tu tabla
      timestamps: false,
      freezeTableName: true,
    },
  );

  // Definición de asociaciones (Crucial para el controlador)
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

export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "cliente",
    {
      idCliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ID_Cliente",
      },
      idTipoDocumento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "ID_Tipo_Documento",
      },
      numeroDocumento: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        field: "Numero_Documento",
      },
      razonSocial: {
        type: DataTypes.STRING(150),
        allowNull: false,
        field: "Razon_social",
      },
      direccion: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "Direccion",
      },
      telefono: {
        type: DataTypes.STRING(25),
        allowNull: true,
        field: "Telefono",
      },
      email: {
        type: DataTypes.STRING(125),
        allowNull: false,
        validate: {
          isEmail: true,
        },
        field: "email",
      },
      tipoCliente: {
        type: DataTypes.STRING(50), // Ej: Minorista, Mayorista
        allowNull: true,
        field: "Tipo_Cliente",
      },
      cupoCredito: {
        type: DataTypes.DECIMAL(18, 2), // Usamos Decimal para valores monetarios
        allowNull: false,
        defaultValue: 0.00,
        field: "Cupo_Credito",
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: "Activo",
      },
      idZona: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "ID_Zona",
      },
    },
    {
      tableName: "cliente",
      timestamps: false,
      freezeTableName: true,
    }
  );

  Customer.associate = (models) => {
    // Relación con Tipo de Documento
    Customer.belongsTo(models.TipoDocumento, {
      foreignKey: "ID_Tipo_Documento",
      as: "tipoDocumento",
    });

    // Nota: Si tienes una tabla de Zonas, podrías asociarla aquí
    /*
    Customer.belongsTo(models.Zona, {
      foreignKey: "ID_Zona",
      as: "zona",
    });
    */
  };

  return Customer;
};
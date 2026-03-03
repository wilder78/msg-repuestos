export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      // Propiedad igual a la DB para evitar errores en Postman
      ID_Cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "ID_Cliente",
      },
      ID_Tipo_Documento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "ID_Tipo_Documento",
        validate: {
          notNull: { msg: "El tipo de documento es obligatorio" }
        }
      },
      Numero_Documento: {
        type: DataTypes.STRING(15), // Ajustado a varchar(15) según tu DB
        allowNull: false,
        unique: true,
        field: "Numero_Documento",
        validate: {
          notEmpty: { msg: "El número de documento es obligatorio" }
        }
      },
      Razon_social: {
        type: DataTypes.STRING(200), // Ajustado a varchar(200) según tu DB
        allowNull: false,
        field: "Razon_social",
        validate: {
          notEmpty: { msg: "La razón social es obligatoria" }
        }
      },
      Direccion: {
        type: DataTypes.STRING(255),
        allowNull: false, // En tu DB dice Nulo: No
        field: "Direccion",
      },
      Telefono: {
        type: DataTypes.STRING(15), // Ajustado a varchar(15) según tu DB
        allowNull: false, // En tu DB dice Nulo: No
        field: "Telefono",
      },
      email: {
        type: DataTypes.STRING(100), // Ajustado a varchar(100) según tu DB
        allowNull: true, // En tu DB dice Nulo: Sí (NULL)
        field: "email",
        validate: {
          isEmail: { msg: "Debe ser un correo electrónico válido" }
        }
      },
      Tipo_Cliente: {
        type: DataTypes.STRING(50),
        allowNull: false, // En tu DB dice Nulo: No
        field: "Tipo_Cliente",
      },
      Cupo_Credito: {
        type: DataTypes.DECIMAL(10, 2), // Ajustado a decimal(10,2) según tu DB
        allowNull: false,
        defaultValue: 0.00,
        field: "Cupo_Credito",
      },
      Activo: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
        field: "Activo",
      },
      ID_Zona: {
        type: DataTypes.INTEGER,
        allowNull: false, // En tu DB dice Nulo: No
        field: "ID_Zona",
      },
    },
    {
      tableName: "cliente", // Nombre de la tabla en singular como muestra tu DB
      timestamps: false,
      freezeTableName: true,
    }
  );

  Customer.associate = (models) => {
    Customer.belongsTo(models.TipoDocumento, {
      foreignKey: "ID_Tipo_Documento",
      as: "tipoDocumento",
    });

    // Descomenta esto cuando el modelo Zona esté listo
    /*
    Customer.belongsTo(models.Zona, {
      foreignKey: "ID_Zona",
      as: "zona",
    });
    */
  };

  return Customer;
};
export default (sequelize, DataTypes) => {
  const Ruta = sequelize.define(
    "Ruta",
    {
      idRuta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_ruta",
      },
      nombreRuta: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "nombre_ruta",
      },
      idZona: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_zona",
      },
      idEmpleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_empleado",
      },
      fechaPlanificada: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        field: "fecha_planificada",
      },
      idEstadoRuta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        field: "id_estado_ruta",
      },
      fechaEjecucionInicio: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "fecha_ejecucion_inicio",
      },
      fechaEjecucionFin: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "fecha_ejecucion_fin",
      },
    },
    {
      tableName: "rutas",
      timestamps: false,
      freezeTableName: true, // Es recomendable activarlo para evitar pluralizaciones automáticas de Sequelize
    }
  );

  Ruta.associate = (models) => {
    // CORRECCIÓN: Usamos 'RutaDetail' porque así lo definiste en index.model.js (db.RutaDetail)
    Ruta.hasMany(models.RutaDetail, {
      foreignKey: "id_ruta",
      as: "detalles",
    });
    
    // Relación con Zona
    Ruta.belongsTo(models.Zona, {
      foreignKey: "id_zona",
      as: "zona",
    });

    // Relación con Empleado (Importante para saber quién conduce)
    Ruta.belongsTo(models.Empleado, {
      foreignKey: "id_empleado",
      as: "empleado",
    });
  };

  return Ruta;
};
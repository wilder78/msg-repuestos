export default (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "empleado",
    {
      idEmpleado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id_empleado",
      },
      idTipoDocumento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_tipo_documento",
      },
      numeroDocumento: {
        type: DataTypes.STRING(15),
        allowNull: false,
        field: "numero_documento",
      },
      nombre: { // Mantenemos 'nombre' en JS
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "nombres", 
      },
      apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "apellidos",
      },
      telefono: {
        type: DataTypes.STRING(15),
        allowNull: true,
        field: "telefono",
      },
      rolOperativo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "rol_operativo",
      },
      idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "id_usuario",
      },
      disponibilidad: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
        field: "disponibilidad",
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
        field: "activo",
      }
    },
    {
      tableName: "empleado",
      timestamps: false,
      freezeTableName: true,
    }
  );

  return Employee;
};
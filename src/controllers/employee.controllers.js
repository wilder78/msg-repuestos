import db from "../models/index.model.js";

const Employee = db.Empleado;

const employeeController = {
  // 1. Registro de nuevo personal: Valida y persiste un nuevo empleado en la base de datos.
  create: async (req, res) => {
    try {
      const nuevoEmpleado = await Employee.create(req.body);

      res.status(201).json({
        status: "success",
        message: "Empleado registrado exitosamente",
        data: nuevoEmpleado,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "No se pudo crear el empleado. Verifique los campos obligatorios.",
        error: error.message,
      });
    }
  },

  // 2. Consulta global: Recupera todos los registros, permitiendo filtrar opcionalmente solo los empleados con estatus activo.
  findAll: async (req, res) => {
    try {
      const empleados = await Employee.findAll({
        where: req.query.soloActivos === "true" ? { activo: 1 } : {},
      });

      res.status(200).json(empleados);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al recuperar la lista de empleados",
        error: error.message,
      });
    }
  },

  // 3. Consulta individual: Localiza un empleado específico mediante su clave primaria (ID) y valida su existencia.
  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const empleado = await Employee.findByPk(id);

      if (!empleado) {
        return res.status(404).json({
          status: "error",
          message: `El empleado con ID ${id} no existe.`,
        });
      }

      res.status(200).json(empleado);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al buscar el empleado",
        error: error.message,
      });
    }
  },

  // 4. Actualización de datos: Modifica los campos enviados en el cuerpo de la petición para el ID especificado y retorna el registro actualizado.
  update: async (req, res) => {
    try {
      const { id } = req.params;

      const [updatedRows] = await Employee.update(req.body, {
        where: { idEmpleado: id },
      });

      if (updatedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "No se realizaron cambios o el empleado no existe.",
        });
      }

      const empleadoActualizado = await Employee.findByPk(id);
      res.status(200).json({
        status: "success",
        message: "Información actualizada correctamente",
        data: empleadoActualizado,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error durante la actualización",
        error: error.message,
      });
    }
  },

  // 5. Remoción de registro: Elimina físicamente la fila del empleado de la base de datos basándose en su identificador único.
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const rowsDeleted = await Employee.destroy({
        where: { idEmpleado: id },
      });

      if (rowsDeleted === 0) {
        return res.status(404).json({
          status: "error",
          message: "No se encontró el registro para eliminar.",
        });
      }

      res.status(200).json({
        status: "success",
        message: "Registro eliminado de la base de datos.",
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al intentar eliminar el registro",
        error: error.message,
      });
    }
  },
};

export default employeeController;
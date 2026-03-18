import db from "../models/index.model.js";

const Employee = db.Empleado;

// FIX: 'export const employeeController' → 'const employeeController'
const employeeController = {
  // 1. Crear un nuevo empleado (CREATE)
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

  // 2. Obtener todos los empleados (READ ALL)
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

  // 3. Obtener un empleado por ID (READ ONE)
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

  // 4. Actualizar un empleado (UPDATE)
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

  // 5. Eliminar un empleado (DELETE)
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

// FIX: export default agregado
export default employeeController;
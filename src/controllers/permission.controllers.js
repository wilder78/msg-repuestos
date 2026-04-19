import db from "../models/index.model.js";

const { Permission } = db;

const permissionController = {
  // 1. Obtener todos los permisos (incluyendo el estado)
  getAllPermissions: async (req, res) => {
    try {
      const permissions = await Permission.findAll({
        attributes: [
          "idPermiso",
          "nombrePermiso",
          "modulo",
          "descripcion",
          "idEstado",
        ],
        order: [["modulo", "ASC"]],
      });
      return res.json(permissions);
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 2. Registrar un nuevo permiso
  createPermission: async (req, res) => {
    try {
      // req.body ahora puede incluir idEstado, si no, el modelo pondrá 1 (Activo) por defecto
      const nuevo = await Permission.create(req.body);
      return res.status(201).json({ ok: true, permission: nuevo });
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 3. Actualizar la información (permite cambiar nombre, descripción o estado)
  updatePermission: async (req, res) => {
    try {
      const { id } = req.params;

      const [updatedRows] = await Permission.update(req.body, {
        where: { idPermiso: id },
      });

      if (updatedRows === 0) {
        return res.status(404).json({
          ok: false,
          message: "Permiso no encontrado o no se detectaron cambios",
        });
      }

      return res.json({
        ok: true,
        message: "Permiso actualizado correctamente",
      });
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 4. Eliminar un permiso (BORRADO FÍSICO DEFINITIVO)
  deletePermission: async (req, res) => {
    try {
      const { id } = req.params;

      // Intentamos eliminar el registro directamente
      const deleted = await Permission.destroy({
        where: { idPermiso: id },
      });

      if (deleted) {
        return res.json({
          ok: true,
          message: "Permiso eliminado físicamente de la base de datos",
        });
      } else {
        return res.status(404).json({
          ok: false,
          message: "El permiso no existe o ya fue eliminado",
        });
      }
    } catch (error) {
      // Manejo específico para errores de Llave Foránea (Foreign Key)
      if (error.name === "SequelizeForeignKeyConstraintError") {
        return res.status(400).json({
          ok: false,
          message:
            "No se puede eliminar: Este permiso está asignado a uno o más Roles. Primero debes desvincularlo de los roles para poder borrarlo.",
        });
      }

      return res.status(500).json({
        ok: false,
        message: "Error al intentar eliminar el registro: " + error.message,
      });
    }
  },
};
export default permissionController;

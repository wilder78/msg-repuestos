import db from "../models/index.model.js";

const { Permission } = db;

const permissionController = {
  // 1. Obtener todos los permisos del sistema organizados por módulo
  getAllPermissions: async (req, res) => {
    try {
      const permissions = await Permission.findAll({
        attributes: ["idPermiso", "nombrePermiso", "modulo", "descripcion"],
        order: [["modulo", "ASC"]],
      });
      return res.json(permissions);
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 2. Registrar un nuevo permiso individual
  createPermission: async (req, res) => {
    try {
      const nuevo = await Permission.create(req.body);
      return res.status(201).json({ ok: true, permission: nuevo });
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 3. Actualizar la información de un permiso existente
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

      return res.json({ ok: true, message: "Permiso actualizado correctamente" });
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 4. Eliminar un permiso (Borrado físico)
  deletePermission: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Permission.destroy({
        where: { idPermiso: id },
      });

      if (deleted) {
        return res.json({ ok: true, message: "Permiso eliminado correctamente" });
      } else {
        return res.status(404).json({ ok: false, message: "Permiso no encontrado" });
      }
    } catch (error) {
      // Nota: Esto fallará si el permiso está asignado a un Rol (FK Constraint)
      return res.status(500).json({ ok: false, message: error.message });
    }
  },
};

export default permissionController;

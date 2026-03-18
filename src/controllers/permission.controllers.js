import db from "../models/index.model.js";

const { Permission } = db;

const permissionController = {
  // 1. Obtener todos los permisos
  getAllPermissions: async (req, res) => {
    try {
      const permissions = await Permission.findAll({
        attributes: ["idPermiso", "nombrePermiso", "modulo", "descripcion"],
        order: [["modulo", "ASC"]],
      });
      res.json(permissions);
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 2. Crear un permiso nuevo
  createPermission: async (req, res) => {
    try {
      const nuevo = await Permission.create(req.body);
      res.status(201).json({ ok: true, permission: nuevo });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 3. Actualizar un permiso (ESTA ES LA QUE FALTABA)
  updatePermission: async (req, res) => {
    try {
      const { id } = req.params;
      // El método update devuelve un array: [filasAfectadas]
      const [updated] = await Permission.update(req.body, {
        where: { idPermiso: id },
      });

      if (updated === 0) {
        return res.status(404).json({
          ok: false,
          message: "Permiso no encontrado o no hubo cambios",
        });
      }

      res.json({ ok: true, message: "Permiso actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 4. Eliminar un permiso (OPCIONAL, pero recomendada)
  deletePermission: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Permission.destroy({
        where: { idPermiso: id },
      });

      if (deleted) {
        res.json({ ok: true, message: "Permiso eliminado correctamente" });
      } else {
        res.status(404).json({ ok: false, message: "Permiso no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },
};

export default permissionController;

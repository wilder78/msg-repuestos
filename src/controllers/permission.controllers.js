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

  // 4. Cambio de Estado / Borrado Lógico (RECOMENDADO)
  // En lugar de destroy, cambiamos id_estado a 2 (Inactivo)
  deletePermission: async (req, res) => {
    try {
      const { id } = req.params;

      // Actualizamos el estado a 2 (Inactivo) en lugar de borrar la fila
      const updatedRows = await Permission.update(
        { idEstado: 2 },
        { where: { idPermiso: id } },
      );

      if (updatedRows[0] > 0) {
        return res.json({
          ok: true,
          message: "Permiso desactivado correctamente (Borrado lógico)",
        });
      } else {
        return res
          .status(404)
          .json({ ok: false, message: "Permiso no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  // Opcional: Si realmente necesitas el borrado físico (Cuidado con las FK)
  hardDeletePermission: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Permission.destroy({ where: { idPermiso: id } });
      if (deleted)
        return res.json({ ok: true, message: "Eliminado de la base de datos" });
      return res.status(404).json({ ok: false, message: "No encontrado" });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message:
          "No se puede eliminar porque está vinculado a un Rol. Intenta desactivarlo.",
      });
    }
  },
};

export default permissionController;

import db from "../models/index.model.js";

const { RolePermission, Rol, Permission } = db;

const rolePermissionController = {
  // 1. Obtener todas las asignaciones de permisos a roles
  getAllAssignments: async (req, res) => {
    try {
      const assignments = await RolePermission.findAll({
        include: [
          {
            model: Rol,
            as: "rol",
            attributes: ["nombre_rol"],
          },
          {
            model: Permission,
            as: "permiso",
            attributes: ["nombrePermiso", "modulo"],
          },
        ],
      });
      return res.json(assignments);
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 2. Asignar un permiso nuevo a un rol específico
  assignPermission: async (req, res) => {
    try {
      const { idRol, idPermiso } = req.body;

      const existe = await RolePermission.findOne({
        where: { idRol, idPermiso },
      });

      if (existe) {
        return res.status(400).json({ 
          message: "El permiso ya está asignado a este rol" 
        });
      }

      const nuevaAsignacion = await RolePermission.create({ idRol, idPermiso });

      return res.status(201).json({
        ok: true,
        message: "Permiso asignado correctamente",
        data: nuevaAsignacion,
      });
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 3. Revocar (eliminar) la relación entre un rol y un permiso
  revokePermission: async (req, res) => {
    try {
      const { idRol, idPermiso } = req.body;

      const eliminado = await RolePermission.destroy({
        where: { idRol, idPermiso },
      });

      if (eliminado) {
        return res.json({ ok: true, message: "Permiso revocado correctamente" });
      } else {
        return res.status(404).json({ message: "La asignación no existe" });
      }
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 4. Obtener todos los permisos asociados a un rol específico
  getPermissionsByRole: async (req, res) => {
    try {
      const { idRol } = req.params;

      const permisos = await RolePermission.findAll({
        where: { idRol },
        include: [
          {
            model: Permission,
            as: "permiso",
            attributes: ["nombrePermiso", "modulo", "descripcion"],
          },
        ],
      });

      return res.json(permisos);
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },
};

export default rolePermissionController;
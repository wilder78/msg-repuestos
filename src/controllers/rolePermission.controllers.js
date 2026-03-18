import db from "../models/index.model.js";

const { RolePermission, Rol, Permission } = db;

const rolePermissionController = {
  // 1. OBTENER TODAS LAS ASIGNACIONES (Soluciona el error 404 en la raíz)
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
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 2. ASIGNAR PERMISO A UN ROL
  assignPermission: async (req, res) => {
    try {
      const { idRol, idPermiso } = req.body;

      // Verificar duplicados
      const existe = await RolePermission.findOne({
        where: { idRol, idPermiso },
      });

      if (existe) {
        return res
          .status(400)
          .json({ message: "El permiso ya está asignado a este rol" });
      }

      const nuevaAsignacion = await RolePermission.create({ idRol, idPermiso });

      res.status(201).json({
        ok: true,
        message: "Permiso asignado correctamente",
        data: nuevaAsignacion,
      });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 3. REVOCAR PERMISO (Quitar asignación)
  revokePermission: async (req, res) => {
    try {
      const { idRol, idPermiso } = req.body;

      const eliminado = await RolePermission.destroy({
        where: { idRol, idPermiso },
      });

      if (eliminado) {
        res.json({ ok: true, message: "Permiso revocado correctamente" });
      } else {
        res.status(404).json({ message: "La asignación no existe" });
      }
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 4. OBTENER PERMISOS DE UN ROL ESPECÍFICO
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

      res.json(permisos);
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },
};

export default rolePermissionController;

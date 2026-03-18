import db from "../models/index.model.js";
const { Rol } = db;

const rolController = {
  // 1. Obtener todos los roles con estado activo (idEstado: 1)
  getAllRoles: async (req, res) => {
    try {
      const roles = await Rol.findAll({
        where: { idEstado: 1 },
      });
      return res.status(200).json(roles);
    } catch (error) {
      console.error("❌ Error en getAllRoles:", error);
      return res.status(500).json({ error: "Error al obtener roles" });
    }
  },

  // 2. Obtener un rol específico por su ID
  getRolById: async (req, res) => {
    try {
      const { id } = req.params;
      const rol = await Rol.findByPk(id);

      if (!rol) {
        return res.status(404).json({ error: "Rol no encontrado" });
      }

      return res.status(200).json(rol);
    } catch (error) {
      console.error("❌ Error en getRolById:", error);
      return res.status(500).json({ error: "Error al obtener el rol" });
    }
  },

  // 3. Crear un nuevo rol en el sistema
  createRol: async (req, res) => {
    try {
      const { nombreRol } = req.body;

      if (!nombreRol) {
        return res.status(400).json({ error: "El nombre del rol es obligatorio" });
      }

      const newRol = await Rol.create({
        nombreRol,
        idEstado: 1
      });

      return res.status(201).json({ 
        message: "Rol creado con éxito", 
        data: newRol 
      });
    } catch (error) {
      console.error("❌ Error en createRol:", error);
      return res.status(500).json({ error: "Error al crear el rol" });
    }
  },

  // 4. Modificar el nombre o estado de un rol existente
  updateRol: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombreRol, idEstado } = req.body;

      const rol = await Rol.findByPk(id);

      if (!rol) {
        return res.status(404).json({ error: "Rol no encontrado" });
      }

      await rol.update({
        nombreRol: nombreRol !== undefined ? nombreRol : rol.nombreRol,
        idEstado: idEstado !== undefined ? idEstado : rol.idEstado
      });

      return res.status(200).json({
        message: "Rol actualizado exitosamente",
        data: rol
      });
    } catch (error) {
      console.error("❌ Error al actualizar rol:", error);
      return res.status(500).json({ error: "Error interno al actualizar el rol" });
    }
  },

  // 5. Desactivar un rol (Borrado lógico: idEstado = 0)
  deleteRol: async (req, res) => {
    try {
      const { id } = req.params;
      const rol = await Rol.findByPk(id);

      if (!rol) {
        return res.status(404).json({ error: "Rol no encontrado" });
      }

      await rol.update({ idEstado: 0 });
      return res.status(200).json({ message: "Rol desactivado correctamente" });
    } catch (error) {
      console.error("❌ Error en deleteRol:", error);
      return res.status(500).json({ error: "Error al desactivar el rol" });
    }
  }
};

export default rolController;
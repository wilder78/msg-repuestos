import db from "../models/index.model.js";
const { Rol } = db;

const rolController = {
  // 1. Obtener todos los roles registrados en la base de datos
  getAllRoles: async (req, res) => {
    try {
      const roles = await Rol.findAll({
        attributes: ["idRol", "nombreRol", "descripcion", "idEstado"],
        order: [["idRol", "ASC"]],
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
      const rol = await Rol.findByPk(id, {
        attributes: ["idRol", "nombreRol", "descripcion", "idEstado"],
      });

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
      const { nombreRol, descripcion } = req.body;

      if (!nombreRol || nombreRol.trim() === "") {
        return res
          .status(400)
          .json({ error: "El nombre del rol es obligatorio" });
      }

      const existingRol = await Rol.findOne({
        where: {
          nombreRol: {
            [Op.like]: nombreRol.trim(),
          },
        },
      });

      if (existingRol) {
        return res.status(400).json({
          error: `El rol "${nombreRol}" ya existe en el sistema (puede ser una variación de Mayúsculas/Minúsculas).`,
        });
      }

      const newRol = await Rol.create({
        nombreRol: nombreRol.trim(),
        descripcion,
        idEstado: 1,
      });

      return res.status(201).json({
        message: "Rol creado con éxito",
        data: newRol,
      });
    } catch (error) {
      console.error("❌ Error en createRol:", error);

      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ error: "El nombre del rol ya existe" });
      }

      return res.status(500).json({ error: "Error interno al crear el rol" });
    }
  },

  // 4. Modificar un rol existente
  updateRol: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombreRol, descripcion, idEstado } = req.body;

      if (parseInt(id) === 1) {
        return res.status(403).json({
          error:
            "Acceso denegado: El rol principal del sistema es de solo lectura y no puede ser modificado.",
        });
      }

      const rol = await Rol.findByPk(id);

      if (!rol) {
        return res.status(404).json({ error: "Rol no encontrado" });
      }

      if (
        nombreRol &&
        nombreRol.toLowerCase() !== rol.nombreRol.toLowerCase()
      ) {
        const existingRol = await Rol.findOne({
          where: {
            nombreRol: { [db.Sequelize.Op.like]: nombreRol.trim() },
          },
        });

        if (existingRol) {
          return res
            .status(400)
            .json({ error: "El nuevo nombre de rol ya está en uso." });
        }
      }

      await rol.update({
        nombreRol: nombreRol !== undefined ? nombreRol.trim() : rol.nombreRol,
        descripcion: descripcion !== undefined ? descripcion : rol.descripcion,
        idEstado: idEstado !== undefined ? idEstado : rol.idEstado,
      });

      return res.status(200).json({
        message: "Rol actualizado exitosamente",
        data: rol,
      });
    } catch (error) {
      console.error("❌ Error al actualizar rol:", error);
      return res
        .status(500)
        .json({ error: "Error interno al actualizar el rol" });
    }
  },

  // 5. Eliminacion de un rol.
  deleteRol: async (req, res) => {
    try {
      const { id } = req.params;

      const rol = await Rol.findByPk(id);

      if (!rol) {
        return res.status(404).json({ error: "Rol no encontrado" });
      }

      if (parseInt(id) === 1) {
        return res.status(403).json({
          error:
            "Operación prohibida: El rol principal (Master) no puede ser eliminado del sistema.",
        });
      }

      await rol.destroy();

      return res.status(200).json({
        message: `El rol "${rol.nombreRol}" ha sido eliminado permanentemente.`,
      });
    } catch (error) {
      console.error("❌ Error en deleteRol:", error);

      if (error.name === "SequelizeForeignKeyConstraintError") {
        return res.status(400).json({
          error:
            "No se puede eliminar el rol porque tiene usuarios o permisos asociados.",
        });
      }

      return res
        .status(500)
        .json({ error: "Error interno al eliminar el rol" });
    }
  },
};

export default rolController;

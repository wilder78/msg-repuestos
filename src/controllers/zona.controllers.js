import { response } from "express";
import db from "../models/index.model.js";

const zonaController = {
  // 1. Obtener todas las zonas
  getAllZonas: async (req, res = response) => {
    try {
      if (!db.Zona) {
        throw new Error("El modelo Zona no está inicializado.");
      }

      const zonas = await db.Zona.findAll({
        // Cambiado de idZona a id_zona para coincidir con el modelo
        order: [["id_zona", "ASC"]],
      });
      return res.status(200).json(zonas);
    } catch (error) {
      console.error("Error en getAllZonas:", error);
      return res.status(500).json({
        status: "error",
        message: "Error al obtener las zonas",
        error: error.message,
      });
    }
  },

  // 2. Obtener una zona por ID
  getZonaById: async (req, res = response) => {
    const { id } = req.params;
    try {
      const zona = await db.Zona.findByPk(id);
      if (!zona) {
        return res.status(404).json({
          status: "error",
          message: "Zona no encontrada",
        });
      }
      return res.json(zona);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al obtener la zona",
        error: error.message,
      });
    }
  },

  // 3. Crear una nueva zona
  createZona: async (req, res = response) => {
    try {
      // VALIDACIÓN CLAVE: Cambiado de nombreZona a Nombre_Zona
      if (!req.body.Nombre_Zona) {
        return res.status(400).json({
          status: "error",
          message: "El nombre de la zona es obligatorio.",
        });
      }

      // Al usar req.body directamente, Sequelize mapeará Nombre_Zona, Descripcion y Activo
      const nuevaZona = await db.Zona.create(req.body);

      return res.status(201).json({
        status: "success",
        message: "Zona creada con éxito",
        data: nuevaZona,
      });
    } catch (error) {
      const errorMsg =
        error.name === "SequelizeValidationError"
          ? error.errors.map((e) => e.message).join(", ")
          : error.message;

      return res.status(400).json({
        status: "error",
        message: "No se pudo crear la zona.",
        error: errorMsg,
      });
    }
  },

  // 4. Actualizar zona
  updateZona: async (req, res = response) => {
    const { id } = req.params;
    try {
      // Extraemos id_zona (con guion bajo) para evitar que se intente actualizar la PK
      const { id_zona, ...dataToUpdate } = req.body;

      const [updated] = await db.Zona.update(dataToUpdate, {
        where: { id_zona: id }, // Cambiado a id_zona
      });

      if (updated === 0) {
        return res.status(404).json({
          status: "error",
          message: "Zona no encontrada o sin cambios aplicados.",
        });
      }

      const zonaActualizada = await db.Zona.findByPk(id);
      return res.json({
        status: "success",
        message: "Zona actualizada con éxito",
        data: zonaActualizada,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al actualizar la zona",
        error: error.message,
      });
    }
  },

  // 5. Desactivar zona (Borrado lógico)
  deleteZona: async (req, res = response) => {
    const { id } = req.params;
    try {
      // Cambiado 'activo' a 'Activo' (con Mayúscula) y 'idZona' a 'id_zona'
      const [result] = await db.Zona.update(
        { Activo: 0 },
        {
          where: { id_zona: id },
        },
      );

      if (result === 0) {
        return res.status(404).json({
          status: "error",
          message: "No se encontró la zona para desactivar.",
        });
      }

      return res.json({
        status: "success",
        message: "Zona desactivada correctamente",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al desactivar la zona",
        error: error.message,
      });
    }
  },
};

export default zonaController;

// import { response } from "express";
// import db from "../models/index.model.js";

// const zonaController = {
//   // 1. Obtener todas las zonas
//   getAllZonas: async (req, res = response) => {
//     try {
//       const zonas = await db.Zona.findAll({
//         where: { activo: true } // Opcional: solo traer las activas por defecto
//       });
//       res.json(zonas);
//     } catch (error) {
//       res.status(500).json({
//         status: "error",
//         message: "Error al obtener las zonas",
//         error: error.message
//       });
//     }
//   },

//   // 2. Obtener una zona por ID
//   getZonaById: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       const zona = await db.Zona.findByPk(id);
//       if (!zona) {
//         return res.status(404).json({
//           status: "error",
//           message: "Zona no encontrada"
//         });
//       }
//       res.json(zona);
//     } catch (error) {
//       res.status(500).json({
//         status: "error",
//         message: "Error al obtener la zona",
//         error: error.message
//       });
//     }
//   },

//   // 3. Crear una nueva zona
//   createZona: async (req, res = response) => {
//     try {
//       const nuevaZona = await db.Zona.create(req.body);
//       res.status(201).json({
//         status: "success",
//         message: "Zona creada con éxito",
//         data: nuevaZona,
//       });
//     } catch (error) {
//       res.status(400).json({
//         status: "error",
//         message: "Error al crear la zona",
//         error: error.message
//       });
//     }
//   },

//   // 4. Actualizar zona
//   updateZona: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       const [updated] = await db.Zona.update(req.body, {
//         where: { idZona: id }, // Recuerda que en JS es idZona por el mapeo field: 'id_zona'
//       });

//       if (updated === 0) {
//         return res.status(404).json({
//           status: "error",
//           message: "Zona no encontrada o sin cambios"
//         });
//       }

//       const zonaActualizada = await db.Zona.findByPk(id);
//       res.json({
//         status: "success",
//         message: "Zona actualizada",
//         data: zonaActualizada
//       });
//     } catch (error) {
//       res.status(500).json({
//         status: "error",
//         message: "Error al actualizar la zona",
//         error: error.message
//       });
//     }
//   },

//   // 5. Desactivar zona (Borrado lógico)
//   deleteZona: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       await db.Zona.update({ activo: false }, {
//         where: { idZona: id }
//       });
//       res.json({
//         status: "success",
//         message: "Zona desactivada correctamente"
//       });
//     } catch (error) {
//       res.status(500).json({
//         status: "error",
//         message: "Error al eliminar la zona",
//         error: error.message
//       });
//     }
//   },
// };

// export default zonaController;

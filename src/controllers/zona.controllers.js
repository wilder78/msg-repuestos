import { response } from "express";
import db from "../models/index.model.js";

const zonaController = {
  // 1. Obtener todas las zonas registradas
  getAllZonas: async (req, res = response) => {
    try {
      if (!db.Zona) {
        throw new Error("El modelo Zona no está inicializado.");
      }

      const zonas = await db.Zona.findAll({
        order: [["idZona", "ASC"]],
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

  // 2. Obtener una zona específica por su ID
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

  // 3. Crear una nueva zona en el sistema
  createZona: async (req, res = response) => {
    try {
      const { nombre_zona, descripcion, activo } = req.body;

      if (!nombre_zona) {
        return res.status(400).json({
          status: "error",
          message: "El nombre de la zona es obligatorio.",
        });
      }

      const nuevaZona = await db.Zona.create({
        nombreZona: nombre_zona,
        descripcion: descripcion,
        activo: activo ?? 1,
      });

      return res.status(201).json({
        status: "success",
        message: "Zona creada con éxito",
        data: nuevaZona,
      });
    } catch (error) {
      const errorMsg = error.name === "SequelizeValidationError"
        ? error.errors.map((e) => e.message).join(", ")
        : error.message;

      return res.status(400).json({
        status: "error",
        message: "No se pudo crear la zona.",
        error: errorMsg,
      });
    }
  },

  // 4. Actualizar los datos de una zona existente
  updateZona: async (req, res = response) => {
    const { id } = req.params;
    try {
      const { nombre_zona, descripcion, activo } = req.body;
      const dataToUpdate = {};

      if (nombre_zona) dataToUpdate.nombreZona = nombre_zona;
      if (descripcion !== undefined) dataToUpdate.descripcion = descripcion;
      if (activo !== undefined) dataToUpdate.activo = activo;

      const [updated] = await db.Zona.update(dataToUpdate, {
        where: { idZona: id },
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

  // 5. Desactivar una zona (Borrado lógico)
  deleteZona: async (req, res = response) => {
    const { id } = req.params;
    try {
      const [result] = await db.Zona.update(
        { activo: 0 },
        { where: { idZona: id } }
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
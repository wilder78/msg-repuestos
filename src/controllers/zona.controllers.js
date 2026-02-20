import { response } from "express";
import db from "../models/index.model.js"; 

const zonaController = {
  // 1. Obtener todas las zonas
  getAllZonas: async (req, res = response) => {
    try {
      const zonas = await db.Zona.findAll({
        where: { activo: true } // Opcional: solo traer las activas por defecto
      });
      res.json(zonas);
    } catch (error) {
      res.status(500).json({ 
        status: "error",
        message: "Error al obtener las zonas", 
        error: error.message 
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
          message: "Zona no encontrada" 
        });
      }
      res.json(zona);
    } catch (error) {
      res.status(500).json({ 
        status: "error",
        message: "Error al obtener la zona", 
        error: error.message 
      });
    }
  },

  // 3. Crear una nueva zona
  createZona: async (req, res = response) => {
    try {
      const nuevaZona = await db.Zona.create(req.body);
      res.status(201).json({
        status: "success",
        message: "Zona creada con éxito",
        data: nuevaZona,
      });
    } catch (error) {
      res.status(400).json({ 
        status: "error",
        message: "Error al crear la zona", 
        error: error.message 
      });
    }
  },

  // 4. Actualizar zona
  updateZona: async (req, res = response) => {
    const { id } = req.params;
    try {
      const [updated] = await db.Zona.update(req.body, {
        where: { idZona: id }, // Recuerda que en JS es idZona por el mapeo field: 'id_zona'
      });
      
      if (updated === 0) {
        return res.status(404).json({ 
          status: "error",
          message: "Zona no encontrada o sin cambios" 
        });
      }
      
      const zonaActualizada = await db.Zona.findByPk(id);
      res.json({ 
        status: "success",
        message: "Zona actualizada", 
        data: zonaActualizada 
      });
    } catch (error) {
      res.status(500).json({ 
        status: "error",
        message: "Error al actualizar la zona", 
        error: error.message 
      });
    }
  },

  // 5. Desactivar zona (Borrado lógico)
  deleteZona: async (req, res = response) => {
    const { id } = req.params;
    try {
      await db.Zona.update({ activo: false }, {
        where: { idZona: id }
      });
      res.json({ 
        status: "success",
        message: "Zona desactivada correctamente" 
      });
    } catch (error) {
      res.status(500).json({ 
        status: "error",
        message: "Error al eliminar la zona", 
        error: error.message 
      });
    }
  },
};

export default zonaController;
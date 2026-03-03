import { response } from "express";
import db from "../models/index.model.js"; 

const categoryController = {
  // 1. Obtener todas las categorías
  getAllCategories: async (req, res = response) => {
    try {
      if (!db.Category) {
        throw new Error("El modelo Category no está inicializado.");
      }

      const categories = await db.Category.findAll({
        order: [['id_categoria', 'ASC']]
      });
      return res.status(200).json(categories);
    } catch (error) {
      console.error("Error en getAllCategories:", error);
      return res.status(500).json({ 
        status: "error",
        message: "Error al obtener las categorías", 
        error: error.message 
      });
    }
  },

  // 2. Obtener una categoría por ID
  getCategoryById: async (req, res = response) => {
    const { id } = req.params;
    try {
      const category = await db.Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ 
          status: "error",
          message: "Categoría no encontrada" 
        });
      }
      return res.json(category);
    } catch (error) {
      return res.status(500).json({ 
        status: "error",
        message: "Error al obtener la categoría", 
        error: error.message 
      });
    }
  },

  // 3. Crear una nueva categoría
  createCategory: async (req, res = response) => {
    try {
      // Validación básica de entrada (Sincronizada con la DB)
      if (!req.body.nombre_categoria) {
        return res.status(400).json({
          status: "error",
          message: "El nombre de la categoría es obligatorio."
        });
      }

      const newCategory = await db.Category.create(req.body);
      return res.status(201).json({
        status: "success",
        message: "Categoría creada con éxito",
        data: newCategory,
      });
    } catch (error) {
      const errorMsg = error.name === 'SequelizeValidationError' 
        ? error.errors.map(e => e.message).join(", ")
        : error.message;

      return res.status(400).json({ 
        status: "error",
        message: "No se pudo crear la categoría.", 
        error: errorMsg 
      });
    }
  },

  // 4. Actualizar categoría
  updateCategory: async (req, res = response) => {
    const { id } = req.params;
    try {
      // Evitamos actualizar el ID primario si viene en el body
      const { id_categoria, ...dataToUpdate } = req.body;

      const [updated] = await db.Category.update(dataToUpdate, {
        where: { id_categoria: id },
      });
      
      if (updated === 0) {
        return res.status(404).json({ 
          status: "error",
          message: "Categoría no encontrada o sin cambios aplicados." 
        });
      }
      
      const categoryUpdated = await db.Category.findByPk(id);
      return res.json({ 
        status: "success",
        message: "Categoría actualizada con éxito", 
        data: categoryUpdated 
      });
    } catch (error) {
      return res.status(500).json({ 
        status: "error",
        message: "Error al actualizar la categoría", 
        error: error.message 
      });
    }
  },

  // 5. Desactivar categoría (Borrado lógico)
  deleteCategory: async (req, res = response) => {
    const { id } = req.params;
    try {
      const [result] = await db.Category.update({ activo: 0 }, {
        where: { id_categoria: id }
      });

      if (result === 0) {
        return res.status(404).json({ 
          status: "error",
          message: "No se encontró la categoría para desactivar." 
        });
      }

      return res.json({ 
        status: "success",
        message: "Categoría desactivada correctamente" 
      });
    } catch (error) {
      return res.status(500).json({ 
        status: "error",
        message: "Error al desactivar la categoría", 
        error: error.message 
      });
    }
  },
};

export default categoryController;
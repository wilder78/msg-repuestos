import { response } from "express";
import db from "../models/index.model.js";

const productController = {
  // 1. Obtener listado de productos con su categoría asociada
  getAllProducts: async (req, res = response) => {
    try {
      const products = await db.Product.findAll({
        include: [
          {
            model: db.Category,
            as: "categoria",
            attributes: ["nombre_categoria"],
          },
        ],
        order: [["idProducto", "ASC"]],
      });
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al obtener productos",
        error: error.message,
      });
    }
  },

  // 2. Obtener el detalle de un producto específico por ID
  getProductById: async (req, res = response) => {
    const { id } = req.params;
    try {
      const product = await db.Product.findByPk(id, {
        include: [{ model: db.Category, as: "categoria" }],
      });
      if (!product) {
        return res
          .status(404)
          .json({ status: "error", message: "Producto no encontrado" });
      }
      return res.json(product);
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  },

  // 3. Crear un nuevo producto (Mapeo de snake_case a camelCase)
  createProduct: async (req, res = response) => {
    try {
      const {
        id_categoria,
        stock_buen_estado,
        stock_defectuoso,
        precio_buy,
        imagen_url,
        categoria, 
        ...rest
      } = req.body;

      const idCat = parseInt(id_categoria);
      if (isNaN(idCat)) {
        return res.status(400).json({
          status: "error",
          message: "El campo id_categoria es obligatorio.",
        });
      }

      const categoryExists = await db.Category.findByPk(idCat);
      if (!categoryExists) {
        return res.status(400).json({
          status: "error",
          message: `La categoría con ID ${idCat} no existe.`,
        });
      }

      const newProduct = await db.Product.create({
        ...rest,
        idCategoria: idCat,
        stockBuenEstado: stock_buen_estado || 0,
        stockDefectuoso: stock_defectuoso || 0,
        precioCompra: precio_buy || 0,
        imagenUrl: imagen_url || "default_producto.png",
      });

      return res.status(201).json({
        status: "success",
        message: "Producto registrado con éxito",
        data: newProduct,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Error al crear el producto",
        error: error.message,
      });
    }
  },

  // 4. Actualizar datos de un producto existente
  updateProduct: async (req, res = response) => {
    const { id } = req.params;
    try {
      const {
        id_categoria,
        stock_buen_estado,
        stock_defectuoso,
        precio_buy,
        imagen_url,
        categoria,
        ...data
      } = req.body;

      const dataToUpdate = { ...data };
      if (id_categoria) dataToUpdate.idCategoria = id_categoria;
      if (stock_buen_estado !== undefined)
        dataToUpdate.stockBuenEstado = stock_buen_estado;
      if (stock_defectuoso !== undefined)
        dataToUpdate.stockDefectuoso = stock_defectuoso;
      if (precio_buy) dataToUpdate.precioCompra = precio_buy;
      if (imagen_url) dataToUpdate.imagenUrl = imagen_url;

      const [updated] = await db.Product.update(dataToUpdate, {
        where: { idProducto: id },
      });

      if (updated === 0) {
        return res.status(404).json({
          status: "error",
          message: "Producto no encontrado o sin cambios",
        });
      }

      const productUpdated = await db.Product.findByPk(id);
      return res.json({
        status: "success",
        message: "Producto actualizado",
        data: productUpdated,
      });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  },

  // 5. Desactivar producto (Borrado lógico: activo = false)
  deleteProduct: async (req, res = response) => {
    const { id } = req.params;
    try {
      const [result] = await db.Product.update(
        { activo: false },
        { where: { idProducto: id } },
      );

      if (result === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "Producto no encontrado" });
      }

      return res.json({
        status: "success",
        message: "Producto desactivado correctamente",
      });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  },
};

export default productController;
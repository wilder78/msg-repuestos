import { response } from "express";
import db from "../models/index.model.js";

const productController = {
  // 1. Obtener listado depurado (Sin duplicados de ID o categoría)
  getAllProducts: async (req, res = response) => {
    try {
      const products = await db.Product.findAll({
        // ✅ Seleccionamos solo los campos necesarios del modelo Product
        attributes: [
          "idProducto",
          "referencia",
          "nombre",
          "descripcion",
          "marca",
          "modelo",
          "imagenUrl",
          "precioCompra",
          "stockBuenEstado",
          "stockDefectuoso",
          "idCategoria",
          "idEstado",
        ],
        include: [
          {
            model: db.Category,
            as: "categoria",
            attributes: ["nombre_categoria"], // ✅ Solo traemos el nombre
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

  // 2. Detalle de producto limpio
  getProductById: async (req, res = response) => {
    const { id } = req.params;
    try {
      const product = await db.Product.findByPk(id, {
        attributes: { exclude: ["id_categoria", "activo"] }, // ✅ Excluimos campos físicos viejos
        include: [
          {
            model: db.Category,
            as: "categoria",
            attributes: ["nombre_categoria"],
          },
        ],
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

  // 3. Crear producto (Manejo limpio de IDs)
  createProduct: async (req, res = response) => {
    try {
      const {
        id_categoria,
        stock_buen_estado,
        stock_defectuoso,
        precio_buy,
        imagen_url,
        id_estado,
        idEstado,
        categoria, // ✅ Se extrae para que no entre en 'rest'
        ...rest
      } = req.body;

      const idCat = parseInt(id_categoria || rest.idCategoria);
      if (isNaN(idCat)) {
        return res
          .status(400)
          .json({ status: "error", message: "ID de categoría inválido." });
      }

      const newProduct = await db.Product.create({
        ...rest,
        idCategoria: idCat,
        stockBuenEstado: stock_buen_estado || 0,
        stockDefectuoso: stock_defectuoso || 0,
        precioCompra: precio_buy || 0,
        imagenUrl: imagen_url || "default_producto.png",
        idEstado: idEstado || id_estado || 1,
      });

      return res.status(201).json({
        status: "success",
        message: "Producto registrado con éxito",
        data: newProduct,
      });
    } catch (error) {
      return res.status(400).json({ status: "error", error: error.message });
    }
  },

  // 4. Actualizar producto
  updateProduct: async (req, res = response) => {
    const { id } = req.params;
    try {
      const {
        id_categoria,
        stock_buen_estado,
        stock_defectuoso,
        precio_buy,
        imagen_url,
        id_estado,
        idEstado,
        categoria, // ✅ Evitamos que el objeto categoría entre al update
        ...data
      } = req.body;

      const dataToUpdate = { ...data };

      // Normalización de campos para el modelo
      if (id_categoria) dataToUpdate.idCategoria = id_categoria;
      if (stock_buen_estado !== undefined)
        dataToUpdate.stockBuenEstado = stock_buen_estado;
      if (stock_defectuoso !== undefined)
        dataToUpdate.stockDefectuoso = stock_defectuoso;
      if (precio_buy) dataToUpdate.precioCompra = precio_buy;
      if (imagen_url) dataToUpdate.imagenUrl = imagen_url;

      const finalStatus = idEstado || id_estado;
      if (finalStatus !== undefined) dataToUpdate.idEstado = finalStatus;

      const [updated] = await db.Product.update(dataToUpdate, {
        where: { idProducto: id },
      });

      if (updated === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "Sin cambios realizados" });
      }

      const productUpdated = await db.Product.findByPk(id);
      return res.json({ status: "success", data: productUpdated });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  },

  // 5. Inactivar producto
  deleteProduct: async (req, res = response) => {
    const { id } = req.params;
    try {
      const [result] = await db.Product.update(
        { idEstado: 2 },
        { where: { idProducto: id } },
      );

      if (result === 0) {
        return res
          .status(404)
          .json({ status: "error", message: "Producto no encontrado" });
      }

      return res.json({
        status: "success",
        message: "Producto inactivado correctamente",
      });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  },
};

export default productController;

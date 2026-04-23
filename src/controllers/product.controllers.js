import { response } from "express";
import db from "../models/index.model.js";

const productController = {
  // 1. Obtener todos los productos
  getAllProducts: async (req, res = response) => {
    try {
      const products = await db.Product.findAll({
        attributes: [
          "id_producto",
          "referencia",
          "nombre",
          "descripcion",
          "marca",
          "modelo",
          "imagen_url",
          "precio_compra",
          "stock_buen_estado",
          "stock_defectuoso",
          "fecha_registro", // <--- AGREGADO
          "id_categoria",
          "id_estado",
        ],
        include: [
          {
            model: db.Category,
            as: "categoria",
            attributes: ["nombre_categoria"],
          },
        ],
        order: [["id_producto", "ASC"]],
      });
      return res.status(200).json(products);
    } catch (error) {
      console.error("Error en getAllProducts:", error);
      return res.status(500).json({
        status: "error",
        message: "Error al obtener productos",
        error: error.message,
      });
    }
  },

  // 2. Obtener producto por ID
  getProductById: async (req, res = response) => {
    const { id } = req.params;
    try {
      const product = await db.Product.findByPk(id, {
        // Mantenemos la exclusión si prefieres que no se vea el ID plano de la categoría
        attributes: { exclude: ["id_categoria"] },
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
      console.error("Error en getProductById:", error);
      return res.status(500).json({ status: "error", error: error.message });
    }
  },

  // 3. Crear producto
  createProduct: async (req, res = response) => {
    try {
      const {
        id_categoria,
        stock_buen_estado,
        stock_defectuoso,
        precio_compra,
        id_estado,
        fecha_registro, // <--- OPCIONAL: Por si quieres enviarla manualmente desde el front
        ...rest
      } = req.body;

      const finalImageUrl = req.file ? req.file.path : "default_producto.png";

      const newProduct = await db.Product.create({
        ...rest,
        id_categoria: parseInt(id_categoria),
        stock_buen_estado: parseInt(stock_buen_estado) || 0,
        stock_defectuoso: parseInt(stock_defectuoso) || 0,
        precio_compra: parseFloat(precio_compra) || 0,
        imagen_url: finalImageUrl,
        id_estado: parseInt(id_estado) || 1,
        // Si no viene en el body, el modelo usará DataTypes.NOW por defecto
        fecha_registro: fecha_registro || undefined,
      });

      return res.status(201).json({
        status: "success",
        message: "Producto registrado con éxito",
        data: newProduct,
      });
    } catch (error) {
      console.error("Error en createProduct:", error);
      return res.status(500).json({
        status: "error",
        message: "Error al procesar la solicitud",
        error: error.message,
      });
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
        precio_compra,
        id_estado,
        fecha_registro, // <--- AGREGADO por si se requiere editar la fecha
        ...data
      } = req.body;

      const dataToUpdate = { ...data };

      if (id_categoria !== undefined)
        dataToUpdate.id_categoria = parseInt(id_categoria);
      if (stock_buen_estado !== undefined)
        dataToUpdate.stock_buen_estado = parseInt(stock_buen_estado);
      if (stock_defectuoso !== undefined)
        dataToUpdate.stock_defectuoso = parseInt(stock_defectuoso);
      if (precio_compra !== undefined)
        dataToUpdate.precio_compra = parseFloat(precio_compra);
      if (id_estado !== undefined) dataToUpdate.id_estado = parseInt(id_estado);
      if (fecha_registro !== undefined)
        dataToUpdate.fecha_registro = fecha_registro;

      if (req.file) {
        dataToUpdate.imagen_url = req.file.path;
      }

      await db.Product.update(dataToUpdate, {
        where: { id_producto: id },
      });

      const productUpdated = await db.Product.findByPk(id);

      if (!productUpdated) {
        return res
          .status(404)
          .json({ status: "error", message: "Producto no encontrado" });
      }

      return res.json({ status: "success", data: productUpdated });
    } catch (error) {
      console.error("Error en updateProduct:", error);
      return res.status(500).json({ status: "error", error: error.message });
    }
  },

  // 5. Eliminar producto
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await db.Product.findByPk(id);

      if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      if (
        producto.imagen_url &&
        producto.imagen_url !== "default_producto.png"
      ) {
        const cleanRef = producto.referencia
          .trim()
          .replace(/[^a-zA-Z0-9-_]/g, "");
        // const publicId = `msg_repuestos/productos/ref-${cleanRef}`;
        // Lógica de cloudinary aquí si es necesaria
      }

      await producto.destroy();

      return res.json({
        status: "success",
        message: "Producto e imagen eliminados correctamente",
      });
    } catch (error) {
      console.error("Error al eliminar:", error);
      return res.status(500).json({ message: "Error al eliminar el producto" });
    }
  },
};

export default productController;

// import { response } from "express";
// import db from "../models/index.model.js";

// const productController = {
//   // 1. Obtener todos los productos
//   getAllProducts: async (req, res = response) => {
//     try {
//       const products = await db.Product.findAll({
//         // Ahora usamos los nombres exactos definidos en el nuevo modelo
//         attributes: [
//           "id_producto",
//           "referencia",
//           "nombre",
//           "descripcion",
//           "marca",
//           "modelo",
//           "imagen_url",
//           "precio_compra",
//           "stock_buen_estado",
//           "stock_defectuoso",
//           "id_categoria",
//           "id_estado",
//         ],
//         include: [
//           {
//             model: db.Category,
//             as: "categoria",
//             attributes: ["nombre_categoria"],
//           },
//         ],
//         order: [["id_producto", "ASC"]],
//       });
//       return res.status(200).json(products);
//     } catch (error) {
//       console.error("Error en getAllProducts:", error);
//       return res.status(500).json({
//         status: "error",
//         message: "Error al obtener productos",
//         error: error.message,
//       });
//     }
//   },

//   // 2. Obtener producto por ID
//   getProductById: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       const product = await db.Product.findByPk(id, {
//         // Excluimos nombres de columnas viejas si ya no existen en el modelo
//         attributes: { exclude: ["id_categoria"] },
//         include: [
//           {
//             model: db.Category,
//             as: "categoria",
//             attributes: ["nombre_categoria"],
//           },
//         ],
//       });

//       if (!product) {
//         return res
//           .status(404)
//           .json({ status: "error", message: "Producto no encontrado" });
//       }
//       return res.json(product);
//     } catch (error) {
//       console.error("Error en getProductById:", error);
//       return res.status(500).json({ status: "error", error: error.message });
//     }
//   },

//   // 3. Crear producto
//   createProduct: async (req, res = response) => {
//     try {
//       // Limpiamos la desestructuración para que coincida con lo que envías en Postman
//       const {
//         id_categoria,
//         stock_buen_estado,
//         stock_defectuoso,
//         precio_compra, // Asegúrate que Postman envíe este nombre
//         id_estado,
//         ...rest
//       } = req.body;

//       // URL de Cloudinary o default
//       const finalImageUrl = req.file ? req.file.path : "default_producto.png";

//       // El nuevo modelo usa snake_case, así que mapeamos directamente
//       const newProduct = await db.Product.create({
//         ...rest,
//         id_categoria: parseInt(id_categoria),
//         stock_buen_estado: parseInt(stock_buen_estado) || 0,
//         stock_defectuoso: parseInt(stock_defectuoso) || 0,
//         precio_compra: parseFloat(precio_compra) || 0, // <--- REPARADO
//         imagen_url: finalImageUrl,
//         id_estado: parseInt(id_estado) || 1,
//       });

//       return res.status(201).json({
//         status: "success",
//         message: "Producto registrado con éxito",
//         data: newProduct,
//       });
//     } catch (error) {
//       console.error("Error en createProduct:", error);
//       return res.status(500).json({
//         status: "error",
//         message: "Error al procesar la solicitud",
//         error: error.message,
//       });
//     }
//   },

//   // 4. Actualizar producto
//   updateProduct: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       const {
//         id_categoria,
//         stock_buen_estado,
//         stock_defectuoso,
//         precio_compra,
//         id_estado,
//         ...data
//       } = req.body;

//       const dataToUpdate = { ...data };

//       // Conversión de tipos usando los nuevos nombres del modelo
//       if (id_categoria !== undefined)
//         dataToUpdate.id_categoria = parseInt(id_categoria);
//       if (stock_buen_estado !== undefined)
//         dataToUpdate.stock_buen_estado = parseInt(stock_buen_estado);
//       if (stock_defectuoso !== undefined)
//         dataToUpdate.stock_defectuoso = parseInt(stock_defectuoso);
//       if (precio_compra !== undefined)
//         dataToUpdate.precio_compra = parseFloat(precio_compra);
//       if (id_estado !== undefined) dataToUpdate.id_estado = parseInt(id_estado);

//       if (req.file) {
//         dataToUpdate.imagen_url = req.file.path;
//       }

//       await db.Product.update(dataToUpdate, {
//         where: { id_producto: id },
//       });

//       const productUpdated = await db.Product.findByPk(id);

//       if (!productUpdated) {
//         return res
//           .status(404)
//           .json({ status: "error", message: "Producto no encontrado" });
//       }

//       return res.json({ status: "success", data: productUpdated });
//     } catch (error) {
//       console.error("Error en updateProduct:", error);
//       return res.status(500).json({ status: "error", error: error.message });
//     }
//   },

//   // 5. Eliminar producto
//   deleteProduct: async (req, res) => {
//     try {
//       const { id } = req.params;
//       const producto = await db.Product.findByPk(id);

//       if (!producto) {
//         return res.status(404).json({ message: "Producto no encontrado" });
//       }

//       // Usamos imagen_url (nombre depurado)
//       if (
//         producto.imagen_url &&
//         producto.imagen_url !== "default_producto.png"
//       ) {
//         const cleanRef = producto.referencia
//           .trim()
//           .replace(/[^a-zA-Z0-9-_]/g, "");
//         const publicId = `msg_repuestos/productos/ref-${cleanRef}`;

//         // Nota: Asegúrate de tener importado cloudinary en este archivo
//         // await cloudinary.uploader.destroy(publicId);
//       }

//       await producto.destroy();

//       return res.json({
//         status: "success",
//         message: "Producto e imagen eliminados correctamente",
//       });
//     } catch (error) {
//       console.error("Error al eliminar:", error);
//       return res.status(500).json({ message: "Error al eliminar el producto" });
//     }
//   },
// };

// export default productController;

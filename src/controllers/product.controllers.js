import { response } from "express";
import db from "../models/index.model.js";

const productController = {
  // 1. Obtener todos los productos
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
        order: [["id_producto", "ASC"]],
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

  // 2. Obtener un producto por ID
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

  // 3. Crear un nuevo producto (DEPURADO)
  createProduct: async (req, res = response) => {
    try {
      // 1. Extraemos TODO lo que venga en el body
      const data = req.body;

      // 2. Buscamos el ID de forma segura (sacándolo de la raíz o de un objeto anidado)
      const idCatRaw =
        data.id_categoria || (data.categoria && data.categoria.id_categoria);
      const idCat = parseInt(idCatRaw);

      // Depuración: Mira esto en tu terminal de VS Code
      console.log("Datos recibidos:", data);
      console.log("ID extraído:", idCat);

      // 3. Si no es un número válido, ni siquiera consultamos la DB
      if (isNaN(idCat)) {
        return res.status(400).json({
          status: "error",
          message: "El campo id_categoria es obligatorio y debe ser un número.",
        });
      }

      // 4. Verificamos existencia en la DB
      const categoryExists = await db.Category.findOne({
        where: { id_categoria: idCat },
      });

      if (!categoryExists) {
        return res.status(400).json({
          status: "error",
          message: `La categoría con ID ${idCat} no existe.`,
        });
      }

      // 5. Limpiamos el objeto para la creación (quitamos el objeto 'categoria' si existe)
      const { categoria, ...cleanData } = data;
      // Aseguramos que el id_categoria sea el número que validamos
      cleanData.id_categoria = idCat;

      const newProduct = await db.Product.create(cleanData);

      return res.status(201).json({
        status: "success",
        message: "Producto registrado con éxito",
        data: newProduct,
      });
    } catch (error) {
      console.error("Error completo:", error);
      return res.status(400).json({
        status: "error",
        message: "Error al crear el producto",
        error: error.message,
      });
    }
  },

  // 4. Actualizar producto
  updateProduct: async (req, res = response) => {
    const { id } = req.params;
    try {
      const { categoria, ...dataToUpdate } = req.body;
      const [updated] = await db.Product.update(dataToUpdate, {
        where: { id_producto: id },
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

  // 5. Desactivar producto
  deleteProduct: async (req, res = response) => {
    const { id } = req.params;
    try {
      const [result] = await db.Product.update(
        { activo: 0 },
        {
          where: { id_producto: id },
        },
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

// import { response } from "express";
// import db from "../models/index.model.js";

// const productController = {
//   // 1. Obtener todos los productos (Incluye su categoría)
//   getAllProducts: async (req, res = response) => {
//     try {
//       const products = await db.Product.findAll({
//         include: [
//           {
//             model: db.Category,
//             as: "categoria",
//             attributes: ["nombre_categoria"], // Solo traemos el nombre para limpiar la respuesta
//           },
//         ],
//         order: [["id_producto", "ASC"]],
//       });
//       return res.status(200).json(products);
//     } catch (error) {
//       return res.status(500).json({
//         status: "error",
//         message: "Error al obtener productos",
//         error: error.message,
//       });
//     }
//   },

//   // 2. Obtener un producto por ID
//   getProductById: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       const product = await db.Product.findByPk(id, {
//         include: [{ model: db.Category, as: "categoria" }],
//       });
//       if (!product) {
//         return res.status(404).json({ status: "error", message: "Producto no encontrado" });
//       }
//       return res.json(product);
//     } catch (error) {
//       return res.status(500).json({ status: "error", error: error.message });
//     }
//   },

//   // 3. Crear un nuevo producto
//   createProduct: async (req, res = response) => {
//     try {
//       // Verificamos si la categoría existe antes de crear el producto
//       const categoryExists = await db.Category.findByPk(req.body.id_categoria);
//       if (!categoryExists) {
//         return res.status(400).json({
//           status: "error",
//           message: "La categoría especificada no existe.",
//         });
//       }

//       const newProduct = await db.Product.create(req.body);
//       return res.status(201).json({
//         status: "success",
//         message: "Producto registrado con éxito",
//         data: newProduct,
//       });
//     } catch (error) {
//       return res.status(400).json({
//         status: "error",
//         message: "Error al crear el producto",
//         error: error.message,
//       });
//     }
//   },

//   // 4. Actualizar producto
//   updateProduct: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       const [updated] = await db.Product.update(req.body, {
//         where: { id_producto: id },
//       });

//       if (updated === 0) {
//         return res.status(404).json({
//           status: "error",
//           message: "Producto no encontrado o sin cambios",
//         });
//       }

//       const productUpdated = await db.Product.findByPk(id);
//       return res.json({
//         status: "success",
//         message: "Producto actualizado",
//         data: productUpdated,
//       });
//     } catch (error) {
//       return res.status(500).json({ status: "error", error: error.message });
//     }
//   },

//   // 5. Desactivar producto (Borrado lógico)
//   deleteProduct: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       const [result] = await db.Product.update({ activo: 0 }, {
//         where: { id_producto: id },
//       });

//       if (result === 0) {
//         return res.status(404).json({ status: "error", message: "Producto no encontrado" });
//       }

//       return res.json({ status: "success", message: "Producto desactivado correctamente" });
//     } catch (error) {
//       return res.status(500).json({ status: "error", error: error.message });
//     }
//   },
// };

// export default productController;

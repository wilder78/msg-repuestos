import { Router } from "express";
import fs from "fs";
import path from "path";
import { config } from "../config/ruta.config.js";
import { validationInputProducts } from "../middlewares/validationMiddleware.js";
import { v4 as uuidv4 } from "uuid";

const ProductsRouter = Router();
const pathToProducts = path.join(config.projectRoot, "/src/data/products.json");

console.log(pathToProducts);

// Endpoint para obtener todos los productos.
ProductsRouter.get("/", async (req, res) => {
  let productsString = await fs.promises.readFile(pathToProducts, "utf-8");
  const products = JSON.parse(productsString);
  res.send({ products });
});

// Endpoint para obtener un producto por su ID
ProductsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "ID inválido o no proporcionado." });
    }

    let products;
    try {
      const productsString = await fs.promises.readFile(
        pathToProducts,
        "utf-8"
      );
      products = JSON.parse(productsString);
    } catch (fileError) {
      console.error("❌ Error al leer el archivo:", fileError);
      return res.status(500).json({ error: "Error al cargar los productos." });
    }

    const product = products.find(
      (p) => String(p.id).trim() === String(id).trim()
    );

    if (!product) {
      return res.status(404).json({
        error: "Producto no encontrado.",
      });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("❌ Error crítico:", error);
    res.status(500).json({
      error: "Error interno del servidor.",
      details: error.message,
    });
  }
});

// Endpoint para generar un nuevo registro.
ProductsRouter.post("/", validationInputProducts, async (req, res) => {
  let productsString = await fs.promises.readFile(pathToProducts, "utf-8");
  const products = JSON.parse(productsString);

  const id = uuidv4();

  const {
    descripcion,
    codigo,
    categoria,
    marca,
    precio,
    precio_compra,
    cantidad,
    unidad_medida,
    estado,
    fecha_registro,
    imagen_url,
    proveedor,
  } = req.body;

  const product = {
    id,
    descripcion,
    codigo,
    categoria,
    marca,
    precio,
    precio_compra,
    cantidad,
    unidad_medida,
    estado,
    fecha_registro,
    imagen_url,
    proveedor,
  };

  products.push(product);

  const productsStringified = JSON.stringify(products, null, "\t");
  await fs.promises.writeFile(pathToProducts, productsStringified);
  res.send({ message: "Producto creado", data: product });
});

export default ProductsRouter;

// // Endpoint para obtener todos los productos.
// ProductsRouter.get("/", async (req, res) => {
//   try {
//     const productsString = await fs.promises.readFile(pathToProducts, "utf-8");
//     const products = JSON.parse(productsString);
//     res.status(200).json({ products });
//   } catch (error) {
//     console.error("❌ Error al leer productos:", error.message);
//     res.status(500).json({
//       error: "No se pudieron obtener los productos.",
//       details: error.message,
//     });
//   }
// });

// // Endpoint para generar un nuevo registro
// ProductsRouter.post("/", validationInputProducts, async (req, res) => {
//   try {
//     // Leer productos actuales desde el archivo
//     const productsString = await fs.promises.readFile(pathToProducts, "utf-8");
//     const products = JSON.parse(productsString);

//     // Extraer campos del body
//     const {
//       descripcion,
//       codigo,
//       categoria,
//       marca,
//       precio,
//       precio_compra,
//       cantidad,
//       unidad_medida,
//       estado,
//       fecha_registro,
//       imagen_url,
//       proveedor,
//     } = req.body;

//     // Validación de respaldo (en caso de que el middleware falle)
//     if (
//       !descripcion || !codigo || !categoria || !marca ||
//       precio == null || precio_compra == null ||
//       cantidad == null || !unidad_medida || !estado ||
//       !fecha_registro || !imagen_url || !proveedor
//     ) {
//       return res.status(400).json({ error: "Todos los campos son obligatorios." });
//     }

//     // Crear nuevo producto con ID único
//     const product = {
//       id: uuidv4(),
//       descripcion,
//       codigo,
//       categoria,
//       marca,
//       precio,
//       precio_compra,
//       cantidad,
//       unidad_medida,
//       estado,
//       fecha_registro,
//       imagen_url,
//       proveedor,
//     };

//     // Agregar a la lista
//     products.push(product);

//     // Guardar el nuevo archivo
//     const updatedData = JSON.stringify(products, null, 2);
//     await fs.promises.writeFile(pathToProducts, updatedData);

//     // Respuesta exitosa
//     res.status(201).json({
//       message: "✅ Producto creado correctamente.",
//       data: product,
//     });

//   } catch (error) {
//     console.error("❌ Error al crear el producto:", error);
//     res.status(500).json({
//       error: "No se pudo crear el producto.",
//       details: error.message,
//     });
//   }
// });

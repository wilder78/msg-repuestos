import { Router } from "express";
import fs from "fs";
import path from "path";
import { config } from "../config/ruta.config.js";
// import { validationInputProducts } from "../middlewares/validationMiddleware.js";
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
ProductsRouter.post("/", async (req, res) => {
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

// Endpoint para actualizar un registro.
ProductsRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
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

    if (!id) {
      return res.status(400).send({ message: "Product ID is required" });
    }

    // Leer productos del archivo
    const productsString = await fs.promises.readFile(pathToProducts, "utf-8");
    const products = JSON.parse(productsString);

    // Buscar el índice del producto a actualizar
    const index = products.findIndex((p) => p.id.toString() === id.toString());

    if (index === -1) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }

    // Actualizar los campos proporcionados
    const existingProduct = products[index];
    const updatedProduct = {
      ...existingProduct,
      descripcion: descripcion ?? existingProduct.descripcion,
      codigo: codigo ?? existingProduct.codigo,
      categoria: categoria ?? existingProduct.categoria,
      marca: marca ?? existingProduct.marca,
      precio: precio ?? existingProduct.precio,
      precio_compra: precio_compra ?? existingProduct.precio_compra,
      cantidad: cantidad ?? existingProduct.cantidad,
      unidad_medida: unidad_medida ?? existingProduct.unidad_medida,
      estado: estado ?? existingProduct.estado,
      fecha_registro: fecha_registro ?? existingProduct.fecha_registro,
      imagen_url: imagen_url ?? existingProduct.imagen_url,
      proveedor: proveedor ?? existingProduct.proveedor,
    };

    // Reemplazar el producto en el array
    products[index] = updatedProduct;

    // Guardar el archivo actualizado
    const productsStringified = JSON.stringify(products, null, "\t");
    await fs.promises.writeFile(pathToProducts, productsStringified);

    res.status(200).send({
      message: "Producto actualizado con éxito",
      data: updatedProduct,
    });
  } catch (error) {
    error.message = `Error en PUT /api/products/${req.params.id}.\n${error.message}`;
    next(error);
  }
});

// Endpoint para eliminar un registro.
ProductsRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ message: "Product ID is required" });
    }

    // Leer productos del archivo
    const productsString = await fs.promises.readFile(pathToProducts, "utf-8");
    const products = JSON.parse(productsString);

    // Buscar el índice del producto a eliminar
    const index = products.findIndex((p) => p.id.toString() === id.toString());

    if (index === -1) {
      return res.status(404).send({ message: "Producto no encontrado" });
    }

    // Eliminar el producto del array
    const deletedProduct = products.splice(index, 1);

    // Guardar el archivo actualizado
    const productsStringified = JSON.stringify(products, null, "\t");
    await fs.promises.writeFile(pathToProducts, productsStringified);

    res.status(200).send({
      message: "Producto eliminado con éxito",
      data: deletedProduct[0],
    });
  } catch (error) {
    error.message = `Error en DELETE /api/products/${req.params.id}.\n${error.message}`;
    next(error);
  }
});

export default ProductsRouter;

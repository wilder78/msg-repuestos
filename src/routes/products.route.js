import express from "express";
import fs from "fs";
import path from "path";

const ProductsRouter = express.Router();
const pathToProducts = path.resolve("src/data/products.json");

// Endpoint para obtener todos los productos
ProductsRouter.get("/", async (req, res) => {
  try {
    const productsString = await fs.promises.readFile(pathToProducts, "utf-8");

    let products;
    try {
      products = JSON.parse(productsString);
    } catch (parseError) {
      return res
        .status(500)
        .json({ error: "❌ Error al parsear el archivo JSON de productos." });
    }

    res.json({ products });
  } catch (err) {
    console.error("❌ Error al leer el archivo de productos:", err);
    res.status(500).json({ error: "No se pudo leer el archivo de productos." });
  }
});

export default ProductsRouter;

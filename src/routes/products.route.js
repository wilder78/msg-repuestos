import { Router } from "express";
import { Product } from "../models/product.model.js";

const ProductsRouter = Router();

// ✅ Obtener todos los productos
ProductsRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
});

// ✅ Crear un nuevo producto
ProductsRouter.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: "Producto creado", product: newProduct });
  } catch (error) {
    res.status(400).json({ message: "Error al crear producto", error });
  }
});

// ✅ Obtener un producto por ID
ProductsRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "ID inválido o error", error });
  }
});

// ✅ Actualizar producto
ProductsRouter.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto actualizado", product: updated });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar producto", error });
  }
});

// ✅ Eliminar producto
ProductsRouter.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado", product: deleted });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar producto", error });
  }
});

export default ProductsRouter;

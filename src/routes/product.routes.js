import { Router } from "express";
import productController from "../controllers/product.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// Middleware global para proteger el catálogo de productos
router.use(verifyToken);

// --- Endpoints de Productos ---

// Obtener todos los productos (incluye categorías)
router.get("/", productController.getAllProducts);

// Obtener un producto por ID
router.get("/:id", productController.getProductById);

// Registrar nuevo producto (Validación de categoría interna)
router.post("/", productController.createProduct);

// Actualizar producto (referencia, precios, stocks)
router.put("/:id", productController.updateProduct);

// Desactivar producto (Borrado lógico: activo = 0)
router.delete("/:id", productController.deleteProduct);

export default router;
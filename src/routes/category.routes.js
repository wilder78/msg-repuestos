import { Router } from "express";
import categoryController from "../controllers/category.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// Middleware global para proteger el catálogo de categorías
router.use(verifyToken);

// --- Endpoints de Categorías ---

// Obtener todas las categorías
router.get("/", categoryController.getAllCategories);

// Obtener una categoría por ID
router.get("/:id", categoryController.getCategoryById);

// Registrar una nueva categoría
router.post("/", categoryController.createCategory);

// Actualizar datos de una categoría
router.put("/:id", categoryController.updateCategory);

// Desactivar categoría (Borrado lógico: activo = 0)
router.delete("/:id", categoryController.deleteCategory);

export default router;

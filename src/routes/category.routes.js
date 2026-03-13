// import { Router } from "express";
// import categoryController from "../controllers/category.controllers.js";
// // Importación del middleware de autenticación (Asegúrate de la ruta exacta)
// import { verifyToken } from "../middleware/auth.middleware.js";

// const router = Router();

// /**
//  * Rutas para la gestión de Categorías
//  * Base URL: /api/categories (según definas en el index de rutas)
//  */

// // 1. Obtener todas las categorías (Protegido)
// router.get("/", [verifyToken], categoryController.getAllCategories);

// // 2. Obtener una categoría por su ID_Categoria (Protegido)
// router.get("/:id", [verifyToken], categoryController.getCategoryById);

// // 3. Registrar una nueva categoría (Protegido)
// router.post("/", [verifyToken], categoryController.createCategory);

// // 4. Actualizar los datos de una categoría (Protegido)
// router.put("/:id", [verifyToken], categoryController.updateCategory);

// // 5. Desactivar una categoría (Borrado lógico / Activo = 0) (Protegido)
// router.delete("/:id", [verifyToken], categoryController.deleteCategory);

// export default router;

import { Router } from "express";
import categoryController from "../controllers/category.controllers.js";
// Importación del middleware de autenticación (Asegúrate de la ruta exacta)
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * Rutas para la gestión de Categorías
 * Base URL: /api/categories (según definas en el index de rutas)
 */

// 1. Obtener todas las categorías (Protegido)
router.get("/", categoryController.getAllCategories);

// 2. Obtener una categoría por su ID_Categoria (Protegido)
router.get("/:id", categoryController.getCategoryById);

// 3. Registrar una nueva categoría (Protegido)
router.post("/", categoryController.createCategory);

// 4. Actualizar los datos de una categoría (Protegido)
router.put("/:id", categoryController.updateCategory);

// 5. Desactivar una categoría (Borrado lógico / Activo = 0) (Protegido)
router.delete("/:id", categoryController.deleteCategory);

export default router;

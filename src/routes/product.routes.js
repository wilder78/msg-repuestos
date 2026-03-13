// import { Router } from "express";
// import productController from "../controllers/product.controllers.js";
// // Importación del middleware de autenticación
// import { verifyToken } from "../middleware/auth.middleware.js";

// const router = Router();

// /**
//  * Rutas para la gestión de Productos (Protegidas con JWT)
//  * Base URL: /api/products
//  */

// // 1. Obtener todos los productos (Incluye la categoría en la respuesta)
// router.get("/", [verifyToken], productController.getAllProducts);

// // 2. Obtener un producto específico por su ID
// router.get("/:id", [verifyToken], productController.getProductById);

// // 3. Registrar un nuevo producto (Requiere ID_Categoria existente)
// router.post("/", [verifyToken], productController.createProduct);

// // 4. Actualizar datos de un producto (Referencia, precios, stocks, etc.)
// router.put("/:id", [verifyToken], productController.updateProduct);

// // 5. Desactivar un producto (Borrado lógico: Activo = 0)
// router.delete("/:id", [verifyToken], productController.deleteProduct);

// export default router;

import { Router } from "express";
import productController from "../controllers/product.controllers.js";
// Importación del middleware de autenticación
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * Rutas para la gestión de Productos (Protegidas con JWT)
 * Base URL: /api/products
 */

// 1. Obtener todos los productos (Incluye la categoría en la respuesta)
router.get("/", productController.getAllProducts);

// 2. Obtener un producto específico por su ID
router.get("/:id", productController.getProductById);

// 3. Registrar un nuevo producto (Requiere ID_Categoria existente)
router.post("/", productController.createProduct);

// 4. Actualizar datos de un producto (Referencia, precios, stocks, etc.)
router.put("/:id", productController.updateProduct);

// 5. Desactivar un producto (Borrado lógico: Activo = 0)
router.delete("/:id", productController.deleteProduct);

export default router;

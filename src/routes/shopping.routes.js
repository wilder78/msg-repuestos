// import { Router } from "express";
// import { shoppingController } from "../controllers/shopping.controllers.js";
// // Importación del middleware de autenticación
// import { verifyToken } from "../middleware/auth.middleware.js";

// const router = Router();

// /**
//  * Rutas para la gestión de Compras (Maestro-Detalle)
//  * Base URL: /api/shopping
//  */

// // 1. Obtener todas las compras
// router.get("/", [verifyToken], shoppingController.getAllPurchases);

// // 2. Obtener una compra específica por ID
// router.get("/:id", [verifyToken], shoppingController.getPurchaseById);

// // 3. Registrar una nueva compra (Estado inicial: Solicitado o Completada)
// router.post("/", [verifyToken], shoppingController.createPurchase);

// // 4. Confirmar recepción de un pedido solicitado (NUEVA RUTA)
// // Esta ruta es la que dispara el incremento de stock físico
// router.patch("/confirm/:id", [verifyToken], shoppingController.confirmReceipt);

// export default router;


import { Router } from "express";
import { shoppingController } from "../controllers/shopping.controllers.js";
// Importación del middleware de autenticación
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * Rutas para la gestión de Compras (Maestro-Detalle)
 * Base URL: /api/shopping
 */

// 1. Obtener todas las compras
router.get("/", shoppingController.getAllPurchases);

// 2. Obtener una compra específica por ID
router.get("/:id", shoppingController.getPurchaseById);

// 3. Registrar una nueva compra (Estado inicial: Solicitado o Completada)
router.post("/", shoppingController.createPurchase);

// 4. Confirmar recepción de un pedido solicitado (NUEVA RUTA)
// Esta ruta es la que dispara el incremento de stock físico
router.patch("/confirm/:id", shoppingController.confirmReceipt);

export default router;

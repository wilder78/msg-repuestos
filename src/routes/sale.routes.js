// import { Router } from "express";
// import saleController from "../controllers/sale.controllers.js";
// import { verifyToken } from "../middleware/auth.middleware.js";

// const router = Router();

// /**
//  * Rutas para la gestión de Ventas (Facturación)
//  * Base URL: /api/sales
//  */

// // 1. Obtener todas las ventas registradas
// router.get("/", verifyToken, saleController.getAllSales);

// // 2. Obtener una venta por su ID
// router.get("/:id", verifyToken, saleController.getSaleById);

// // 3. Convertir un Pedido en Venta (Crear Factura)
// router.post("/", verifyToken, saleController.createSale);

// export default router;

import { Router } from "express";
import saleController from "../controllers/sale.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * Rutas para la gestión de Ventas (Facturación)
 * Base URL: /api/sales
 */

// 1. Obtener todas las ventas registradas
router.get("/", saleController.getAllSales);

// 2. Obtener una venta por su ID
router.get("/:id", saleController.getSaleById);

// 3. Convertir un Pedido en Venta (Crear Factura)
router.post("/", saleController.createSale);

export default router;

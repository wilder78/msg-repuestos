// import { Router } from "express";
// import { orderController } from "../controllers/order.controllers.js";
// import { verifyToken } from "../middleware/auth.middleware.js";

// const router = Router();

// /**
//  * Rutas para la gestión de Pedidos y Cotizaciones
//  * Base URL: /api/orders
//  */

// // 1. Obtener todos los pedidos y cotizaciones (ESTA ES LA QUE FALTABA)
// // Responde a: GET /api/orders
// router.get("/", [verifyToken], orderController.getAllOrders);

// // 2. Obtener un pedido específico por ID
// // Responde a: GET /api/orders/:id
// router.get("/:id", [verifyToken], orderController.getOrderById);

// // 3. Crear una nueva Cotización (1) o Separación (2)
// // Responde a: POST /api/orders
// router.post("/", [verifyToken], orderController.createOrder);

// // 4. Confirmar Separación (Pasar de Cotización a pedido firme y descontar stock)
// // Responde a: PATCH /api/orders/confirm-separation/:id
// router.patch(
//   "/confirm-separation/:id",
//   [verifyToken],
//   orderController.confirmSeparation
// );

// export default router;

import { Router } from "express";
import { orderController } from "../controllers/order.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * Rutas para la gestión de Pedidos y Cotizaciones
 * Base URL: /api/orders
 */

// 1. Obtener todos los pedidos y cotizaciones (ESTA ES LA QUE FALTABA)
// Responde a: GET /api/orders
router.get("/", orderController.getAllOrders);

// 2. Obtener un pedido específico por ID
// Responde a: GET /api/orders/:id
router.get("/:id", orderController.getOrderById);

// 3. Crear una nueva Cotización (1) o Separación (2)
// Responde a: POST /api/orders
router.post("/", orderController.createOrder);

// 4. Confirmar Separación (Pasar de Cotización a pedido firme y descontar stock)
// Responde a: PATCH /api/orders/confirm-separation/:id
router.patch("/confirm-separation/:id", orderController.confirmSeparation);

export default router;

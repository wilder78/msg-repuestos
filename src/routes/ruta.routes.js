// import { Router } from "express";
// import rutaController from "../controllers/ruta.controllers.js";
// // Importación del middleware de autenticación
// import { verifyToken } from "../middleware/auth.middleware.js";

// const router = Router();

// /**
//  * Rutas para la gestión de Rutas y Logística (Protegidas con JWT)
//  * Base URL: /api/rutas
//  */

// // 1. Obtener listado general de rutas (Cabeceras con Empleado y Zona)
// router.get("/", [verifyToken], rutaController.getAllRutas);

// // 2. Obtener una ruta específica con todos sus detalles, paradas y clientes
// router.get("/:id", [verifyToken], rutaController.getRutaById);

// // 3. Planificar una nueva ruta (Crea Cabecera y Detalle en una sola transacción)
// router.post("/", [verifyToken], rutaController.createRuta);

// // 4. Actualizar el estado de una visita específica (Check-in/Check-out del transportista)
// // Se usa PATCH para actualizaciones parciales de la parada
// router.patch("/detalle/:idDetalleRuta", [verifyToken], rutaController.updateVisita);

// export default router;

import { Router } from "express";
import rutaController from "../controllers/ruta.controllers.js";
// Importación del middleware de autenticación
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * Rutas para la gestión de Rutas y Logística (Protegidas con JWT)
 * Base URL: /api/rutas
 */

// 1. Obtener listado general de rutas (Cabeceras con Empleado y Zona)
router.get("/", rutaController.getAllRutas);

// 2. Obtener una ruta específica con todos sus detalles, paradas y clientes
router.get("/:id", rutaController.getRutaById);

// 3. Planificar una nueva ruta (Crea Cabecera y Detalle en una sola transacción)
router.post("/", rutaController.createRuta);

// 4. Actualizar el estado de una visita específica (Check-in/Check-out del transportista)
// Se usa PATCH para actualizaciones parciales de la parada
router.patch("/detalle/:idDetalleRuta", rutaController.updateVisita);

export default router;

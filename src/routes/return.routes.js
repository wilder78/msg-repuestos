// import { Router } from "express";
// import returnController from "../controllers/return.controllers.js";
// import { verifyToken } from "../middleware/auth.middleware.js";

// const router = Router();

// /**
//  * Rutas para la gestión de Devoluciones de Clientes
//  * Base URL: /api/returns
//  */

// // 1. Obtener todas las devoluciones
// // Se mantiene el middleware para asegurar que solo personal autorizado vea el historial
// router.get("/", verifyToken, returnController.getAllReturns);

// // 2. Registrar una nueva devolución
// // Este es el punto crítico donde se dispara la transacción y el ajuste de stock
// router.post("/", verifyToken, returnController.createReturn);

// /**
//  * NOTA DE SEGURIDAD Y AUDITORÍA:
//  * No se implementan métodos PUT ni DELETE para devoluciones.
//  * En sistemas contables/inventarios, las devoluciones son documentos definitivos.
//  * Para corregir un error en una devolución, se debe realizar un "Ajuste de Inventario"
//  * o una contra-entrada manual para mantener la trazabilidad.
//  */

// export default router;

import { Router } from "express";
import returnController from "../controllers/return.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * Rutas para la gestión de Devoluciones de Clientes
 * Base URL: /api/returns
 */

// 1. Obtener todas las devoluciones
// Se mantiene el middleware para asegurar que solo personal autorizado vea el historial
router.get("/", returnController.getAllReturns);

// 2. Registrar una nueva devolución
// Este es el punto crítico donde se dispara la transacción y el ajuste de stock
router.post("/", returnController.createReturn);

/**
 * NOTA DE SEGURIDAD Y AUDITORÍA:
 * No se implementan métodos PUT ni DELETE para devoluciones.
 * En sistemas contables/inventarios, las devoluciones son documentos definitivos.
 * Para corregir un error en una devolución, se debe realizar un "Ajuste de Inventario"
 * o una contra-entrada manual para mantener la trazabilidad.
 */

export default router;

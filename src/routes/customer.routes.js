// import { Router } from "express";
// // 1. Verifica si es controller o controllers (singular/plural)
// import customerController from "../controllers/customer.controllers.js";
// import { verifyToken } from "../middleware/auth.middleware.js";

// const router = Router();

// // 2. Depuración: Si esto imprime 'undefined' en consola, el problema es la exportación
// console.log("Cargando CustomerController:", customerController);

// /**
//  * Base URL: /api/customers
//  */

// // Se recomienda pasar el middleware directamente o en arreglo
// router.get("/", verifyToken, customerController.getAllCustomers);

// router.get("/:id", verifyToken, customerController.getCustomerById);

// router.post("/", verifyToken, customerController.createCustomer);

// router.put("/:id", verifyToken, customerController.updateCustomer);

// router.delete("/:id", verifyToken, customerController.deleteCustomer);

// export default router;

import { Router } from "express";
// 1. Verifica si es controller o controllers (singular/plural)
import customerController from "../controllers/customer.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * Base URL: /api/customers
 */

// Se recomienda pasar el middleware directamente o en arreglo
router.get("/", customerController.getAllCustomers);

router.get("/:id", customerController.getCustomerById);

router.post("/", customerController.createCustomer);

router.put("/:id", customerController.updateCustomer);

router.delete("/:id", customerController.deleteCustomer);

export default router;

import { Router } from "express";
import customerController from "../controllers/customer.controllers.js";
// Importación del middleware de autenticación
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * Rutas para la gestión de Clientes (Protegidas con JWT)
 * Base URL: /api/customers
 */

// 1. Obtener todos los clientes
// Se añade verifyToken como segundo argumento para proteger el acceso
router.get("/", [verifyToken], customerController.getAllCustomers);

// 2. Obtener un cliente por su ID
router.get("/:id", [verifyToken], customerController.getCustomerById);

// 3. Registrar un nuevo cliente
router.post("/", [verifyToken], customerController.createCustomer);

// 4. Actualizar los datos de un cliente
router.put("/:id", [verifyToken], customerController.updateCustomer);

// 5. Desactivar un cliente (Borrado lógico)
router.delete("/:id", [verifyToken], customerController.deleteCustomer);

export default router;
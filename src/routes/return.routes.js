import { Router } from "express";
import returnController from "../controllers/return.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// Middleware de seguridad global
router.use(verifyToken);

// --- Endpoints de Devoluciones (Gestión de Stock) ---

// Obtener todas las devoluciones registradas
router.get("/", returnController.getAllReturns);

// Registrar nueva devolución (Dispara transacción y ajuste de inventario)
router.post("/", returnController.createReturn);

/**
 * NOTA DE AUDITORÍA:
 * No se implementan métodos PUT ni DELETE. Las devoluciones son documentos 
 * definitivos para mantener la trazabilidad contable y de inventarios.
 */

export default router;

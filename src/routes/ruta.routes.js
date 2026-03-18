import { Router } from "express";
import rutaController from "../controllers/ruta.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// Middleware de seguridad para todas las rutas de logística
router.use(verifyToken);

// --- Endpoints de Logística y Despachos ---

// Listado general (Cabeceras con Empleado y Zona)
router.get("/", rutaController.getAllRutas);

// Detalle específico de ruta, paradas y clientes
router.get("/:id", rutaController.getRutaById);

// Planificación de nueva ruta (Cabecera y Detalle)
router.post("/", rutaController.createRuta);

// Actualización de estado de visita (Check-in/Check-out del transportista)
router.patch("/detalle/:idDetalleRuta", rutaController.updateVisita);

export default router;

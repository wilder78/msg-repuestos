import { Router } from "express";
import creditController from "../controllers/credit.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// Middleware global para proteger la gestión de créditos y cupos
router.use(verifyToken);

// --- Endpoints de Créditos ---

// Obtener todos los créditos registrados
router.get("/", creditController.getAllCredits);

// Crear un nuevo registro de crédito para un cliente
router.post("/", creditController.createCredit);

// Actualizar el límite de crédito (Cupo) por ID
router.put("/update-limit/:id", creditController.updateCreditLimit);

export default router;

import { Router } from "express";
import shoppingController from "../controllers/shopping.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// Middleware global para todas las rutas de compras
router.use(verifyToken);

// --- Endpoints de Compras (Maestro-Detalle) ---
router.get("/", shoppingController.getAllPurchases);
router.get("/:id", shoppingController.getPurchaseById);
router.post("/", shoppingController.createPurchase);

// Confirmar recepción: dispara el incremento de stock físico
router.patch("/confirm/:id", shoppingController.confirmReceipt);

export default router;

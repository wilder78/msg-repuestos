// src/routes/index.route.js
import { Router } from "express";
import { ProductsRouter } from "./products.route.js";

const router = Router();

// Montar rutas hijas
router.use("/products", ProductsRouter);

// Exportar como default (💡 lo que causaba el error)
export default router;

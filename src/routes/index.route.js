import { Router } from "express";
import ProductsRouter from "./products.route.js";

const router = Router();

// Montar rutas hijas
router.use("/products", ProductsRouter);

export default router;

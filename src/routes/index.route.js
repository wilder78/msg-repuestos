import { Router } from "express";
import ProductsRouter from "./products.route.js";
// puedes agregar más routers aquí

const router = Router();

// Montar rutas hijas
router.use("/", ProductsRouter);

export default router;



import { Router } from "express";
// ⚠️ Verifica si tu archivo es 'user.routes.js' o 'users.routes.js'
import userRoutes from "./user.routes.js";

const router = Router();

// El prefijo será /api/users
router.use("/users", userRoutes);

export default router;

// import { Router } from "express";
// import userRoutes from "./users.routes.js";
// // Aquí importarás las rutas futuras, por ejemplo:
// // import productRoutes from "./products.routes.js";

// const router = Router();

// // Definimos los prefijos para cada módulo
// router.use("/users", userRoutes);
// // router.use("/products", productRoutes);

// export default router;

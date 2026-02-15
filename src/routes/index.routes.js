import { Router } from "express";
import userRoutes from "./user.routes.js";
import rolRoutes from "./rol.routes.js"; // <--- Importamos el nuevo archivo de rutas

const router = Router();

// El prefijo será /api/users
router.use("/users", userRoutes);

// El prefijo será /api/roles
router.use("/roles", rolRoutes); // <--- Registramos el módulo de roles

export default router;

// import { Router } from "express";
// // ⚠️ Verifica si tu archivo es 'user.routes.js' o 'users.routes.js'
// import userRoutes from "./user.routes.js";

// const router = Router();

// // El prefijo será /api/users
// router.use("/users", userRoutes);

// export default router;

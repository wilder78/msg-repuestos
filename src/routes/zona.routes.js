// import { Router } from "express";
// import zonaController from "../controllers/zona.controllers.js";

// // CORRECCIÓN: Quitamos la "s" de middlewares para que coincida con tu estructura real
// import { verifyToken } from "../middleware/auth.middleware.js"; 

// const router = Router();

// /**
//  * Rutas de Zonas
//  * Protección de rutas mediante JWT
//  */

// // Aplicamos el middleware de autenticación a todas las rutas
// router.use(verifyToken); 

// // Definición de puntos de acceso
// router.get("/", zonaController.getAllZonas);
// router.get("/:id", zonaController.getZonaById);
// router.post("/", zonaController.createZona);
// router.put("/:id", zonaController.updateZona);
// router.delete("/:id", zonaController.deleteZona);

// export default router;



import { Router } from "express";
import zonaController from "../controllers/zona.controllers.js";

// CORRECCIÓN: Quitamos la "s" de middlewares para que coincida con tu estructura real
import { verifyToken } from "../middleware/auth.middleware.js"; 

const router = Router();

/**
 * Rutas de Zonas
 * Protección de rutas mediante JWT
 */

// Aplicamos el middleware de autenticación a todas las rutas
// router.use(verifyToken); 

// Definición de puntos de acceso
router.get("/", zonaController.getAllZonas);
router.get("/:id", zonaController.getZonaById);
router.post("/", zonaController.createZona);
router.put("/:id", zonaController.updateZona);
router.delete("/:id", zonaController.deleteZona);

export default router;


import { Router } from "express";
import zonaController from "../controllers/zona.controllers.js";

const router = Router();

// Definición de rutas
router.get("/", zonaController.getAllZonas);
router.get("/:id", zonaController.getZonaById);
router.post("/", zonaController.createZona);
router.put("/:id", zonaController.updateZona);
router.delete("/:id", zonaController.deleteZona);

// ESTA LÍNEA ES LA CAUSA DEL ERROR SI FALTA:
export default router;

// import { Router } from "express";
// import zonaController from "../controllers/zona.controllers.js";

// const router = Router();

// // RUTA: /api/zonas

// // 1. Obtener todas las zonas
// router.get("/", zonaController.getAllZonas);

// // 2. Obtener una zona por ID
// router.get("/:id", zonaController.getZonaById);

// // 3. Crear una nueva zona
// router.post("/", zonaController.createZona);

// // 4. Actualizar una zona existente
// router.put("/:id", zonaController.updateZona);

// // 5. Desactivar una zona (Borrado lógico)
// router.delete("/:id", zonaController.deleteZona);

// export default router;
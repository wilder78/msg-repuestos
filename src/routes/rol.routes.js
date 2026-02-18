import express from "express";
import {
  getAllRoles,
  getRolById,
  createRol,
  updateRol,
  deleteRol,
} from "../controllers/rol.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// --- RUTAS DE ROLES ---

// Obtener todos los roles
router.get("/", verifyToken, getAllRoles);

// Obtener un rol por ID
router.get("/:id", verifyToken, getRolById); 

// Crear un rol
router.post("/", verifyToken, createRol);

// Actualizar un rol
router.put("/:id", verifyToken, updateRol);

// Eliminar (desactivar) un rol
router.delete("/:id", verifyToken, deleteRol);

export default router;



// import express from "express";
// import {
//   getAllRoles,
//   createRol,
//   deleteRol,
//   updateRol, // Asegúrate de importarlo aquí
// } from "../controllers/rol.controllers.js";
// import { verifyToken } from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.get("/", verifyToken, getAllRoles);
// router.post("/", verifyToken, createRol);
// router.delete("/:id", verifyToken, deleteRol);

// // Esta es la ruta que te falta para que funcione el PUT en Postman
// router.put("/:id", verifyToken, updateRol);

// export default router;

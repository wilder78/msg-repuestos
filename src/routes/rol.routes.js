import express from "express";
import {
  getAllRoles,
  getRolById, // Añadido para soportar GET /api/rol/:id
  createRol,
  updateRol,
  deleteRol,
} from "../controllers/rol.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// --- RUTAS DE ROLES ---

// Obtener todos los roles: GET http://localhost:8080/api/rol
router.get("/", verifyToken, getAllRoles);

// Obtener un rol por ID: GET http://localhost:8080/api/rol/1
router.get("/:id", verifyToken, getRolById); 

// Crear un rol: POST http://localhost:8080/api/rol
router.post("/", verifyToken, createRol);

// Actualizar un rol: PUT http://localhost:8080/api/rol/1
router.put("/:id", verifyToken, updateRol);

// Eliminar (desactivar) un rol: DELETE http://localhost:8080/api/rol/1
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

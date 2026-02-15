import express from "express";
import {
  getAllRoles,
  createRol,
  deleteRol,
  updateRol, // Asegúrate de importarlo aquí
} from "../controllers/rol.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllRoles);
router.post("/", verifyToken, createRol);
router.delete("/:id", verifyToken, deleteRol);

// Esta es la ruta que te falta para que funcione el PUT en Postman
router.put("/:id", verifyToken, updateRol);

export default router;

// import express from "express";
// import {
//   getAllRoles,
//   createRol,
//   deleteRol,
// } from "../controllers/rol.controllers.js";
// import { verifyToken } from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.get("/", verifyToken, getAllRoles);
// router.post("/", verifyToken, createRol);
// router.delete("/:id", verifyToken, deleteRol);

// export default router;

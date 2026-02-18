import express from "express";
import { 
  getAllTipos, 
  getTipoById, // <--- Importar la nueva función
  createTipo, 
  updateTipo, 
  deleteTipo 
} from "../controllers/documentType.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Obtener todos los registros
router.get("/", verifyToken, getAllTipos);

// Consultar por ID
router.get("/:id", verifyToken, getTipoById);

// Crear registro
router.post("/", verifyToken, createTipo);

// Actualizar por ID
router.put("/:id", verifyToken, updateTipo);

// Eliminar por ID
router.delete("/:id", verifyToken, deleteTipo);

export default router;


// import express from "express";
// import { getAllTipos, createTipo, updateTipo, deleteTipo } from "../controllers/tipoDocumento.controllers.js";
// import { verifyToken } from "../middleware/auth.middleware.js";

// const router = express.Router();

// router.get("/", verifyToken, getAllTipos);
// router.post("/", verifyToken, createTipo);
// router.put("/:id", verifyToken, updateTipo);
// router.delete("/:id", verifyToken, deleteTipo);

// export default router;
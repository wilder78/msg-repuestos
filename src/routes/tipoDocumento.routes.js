import express from "express";
import { getAllTipos, createTipo, updateTipo, deleteTipo } from "../controllers/tipoDocumento.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getAllTipos);
router.post("/", verifyToken, createTipo);
router.put("/:id", verifyToken, updateTipo);
router.delete("/:id", verifyToken, deleteTipo);

export default router;
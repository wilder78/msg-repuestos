import { Router } from "express";
import userController from "../controllers/user.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// --- Rutas Públicas (Auth) ---
router.post("/login", userController.loginUser);
router.post("/register", userController.createUser);

// --- Rutas Protegidas (Requieren Token) ---
router.use(verifyToken);

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.get("/email/:email", userController.getUserByEmail);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;

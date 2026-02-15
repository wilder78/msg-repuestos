import express from "express";
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} from "../controllers/user.controllers.js"; // <--- Confirmado con "s"
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Auth & Registro (Públicos)
router.post("/login", loginUser);
router.post("/register", createUser);

// CRUD Administrativo (Protegidos)
router.get("/", verifyToken, getAllUsers);
router.get("/email/:email", verifyToken, getUserByEmail);
router.get("/:id", verifyToken, getUserById); 
router.put("/:idUsuario", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;


// import express from "express";
// import {
//   getAllUsers,
//   getUserById,
//   getUserByEmail,
//   createUser,
//   updateUser,
//   deleteUser,
//   loginUser
// } from "../controllers/user.controllers.js";

// const router = express.Router();

// // Auth & Registro
// router.post("/login", loginUser);
// router.post("/register", createUser);

// // CRUD Administrativo
// router.get("/", getAllUsers);
// router.get("/email/:email", getUserByEmail);
// router.get("/:id", getUserById); // Movido después de /email para evitar conflictos
// router.put("/:idUsuario", updateUser);
// router.delete("/:id", deleteUser);

// export default router;

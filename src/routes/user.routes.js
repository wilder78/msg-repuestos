import express from "express";
import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  loginUser
} from "../controllers/user.controllers.js";

const router = express.Router();

// Auth & Registro
router.post("/login", loginUser);
router.post("/register", createUser);

// CRUD Administrativo
router.get("/", getAllUsers);
router.get("/email/:email", getUserByEmail);
router.get("/:id", getUserById); // Movido después de /email para evitar conflictos
router.put("/:idUsuario", updateUser);
router.delete("/:id", deleteUser);

export default router;


// import express from "express";
// import {
//   getAllUsers,
//   getUserById,
//   getUserByEmail,
//   createUser,
//   updateUser,
//   deleteUser,
//   loginUser // 👈 Agregamos el login que decodificamos antes
// } from "../controllers/user.controller.js";

// const router = express.Router();

// // 🔐 Rutas de Autenticación
// router.post("/login", loginUser);
// router.post("/register", createUser); // Es el mismo createUser pero con nombre semántico

// // 👥 Rutas de Administración de Usuarios
// router.get("/", getAllUsers);
// router.get("/:id", getUserById);
// router.get("/email/:email", getUserByEmail);
// router.post("/", createUser);
// router.put("/:idUsuario", updateUser);
// router.delete("/:id", deleteUser);

// export default router;
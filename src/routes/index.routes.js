import { Router } from "express";
import userRoutes from "./user.routes.js";
import rolRoutes from "./rol.routes.js";
import tipoDocumentoRoutes from "./documentType.routes.js";
import employeeRoutes from "./employee.routes.js"; // 1. Importar el router de empleados

const router = Router();

// Rutas para Usuarios: /api/users
router.use("/users", userRoutes);

// Rutas para Roles: /api/roles
router.use("/roles", rolRoutes);

// Rutas para Tipo de Documento: /api/tipo-documento
router.use("/tipo-documento", tipoDocumentoRoutes);

// Rutas para Empleados: /api/employees
router.use("/employees", employeeRoutes); // 2. Registrar el prefijo para empleados

export default router;

// import { Router } from "express";
// import userRoutes from "./user.routes.js";
// import rolRoutes from "./rol.routes.js";
// import tipoDocumentoRoutes from "./documentType.routes.js"; // <--- 1. Importar el nuevo router


// const router = Router();

// // Rutas para Usuarios: /api/users
// router.use("/users", userRoutes);

// // Rutas para Roles: /api/roles
// router.use("/roles", rolRoutes);

// // Rutas para Tipo de Documento: /api/tipo-documento
// router.use("/tipo-documento", tipoDocumentoRoutes); // <--- 2. Registrar el nuevo prefijo

// export default router;



// import { Router } from "express";
// import userRoutes from "./user.routes.js";
// import rolRoutes from "./rol.routes.js"; // <--- Importamos el nuevo archivo de rutas

// const router = Router();

// // El prefijo será /api/users
// router.use("/users", userRoutes);

// // El prefijo será /api/roles
// router.use("/roles", rolRoutes); // <--- Registramos el módulo de roles

// export default router;

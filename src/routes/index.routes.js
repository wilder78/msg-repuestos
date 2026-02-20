import { Router } from "express";
import userRoutes from "./user.routes.js";
import rolRoutes from "./rol.routes.js";
import tipoDocumentoRoutes from "./documentType.routes.js";
import employeeRoutes from "./employee.routes.js";
import supplierRoutes from "./supplier.routes.js";
import zonaRoutes from "./zona.routes.js"; // <-- Importamos las nuevas rutas de zona

const router = Router();

// Rutas para Usuarios: /api/users
router.use("/users", userRoutes);

// Rutas para Roles: /api/roles
router.use("/roles", rolRoutes);

// Rutas para Tipo de Documento: /api/tipo-documento
router.use("/tipo-documento", tipoDocumentoRoutes);

// Rutas para Empleados: /api/employees
router.use("/employees", employeeRoutes);

// Rutas para Proveedores: /api/suppliers
router.use("/suppliers", supplierRoutes);

// Rutas para Zonas: /api/zonas
router.use("/zonas", zonaRoutes); // <-- Registramos la ruta de zonas

export default router;


// import { Router } from "express";
// import userRoutes from "./user.routes.js";
// import rolRoutes from "./rol.routes.js";
// import tipoDocumentoRoutes from "./documentType.routes.js";
// import employeeRoutes from "./employee.routes.js";

// const router = Router();

// // Rutas para Usuarios: /api/users
// router.use("/users", userRoutes);

// // Rutas para Roles: /api/roles
// router.use("/roles", rolRoutes);

// // Rutas para Tipo de Documento: /api/tipo-documento
// router.use("/tipo-documento", tipoDocumentoRoutes);

// // Rutas para Empleados: /api/employees
// router.use("/employees", employeeRoutes); // 2. Registrar el prefijo para empleados

// export default router;

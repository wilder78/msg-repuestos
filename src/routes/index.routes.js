import { Router } from "express";
import userRoutes from "./user.routes.js";
import rolRoutes from "./rol.routes.js";
import tipoDocumentoRoutes from "./documentType.routes.js";
import employeeRoutes from "./employee.routes.js";
import supplierRoutes from "./supplier.routes.js";
import zonaRoutes from "./zona.routes.js";
import customerRoutes from "./customer.routes.js";
import categoryRoutes from "./category.routes.js";
import productRoutes from "./product.routes.js"; // <--- 1. IMPORTACIÓN DE PRODUCTOS

const router = Router();

/**
 * Agrupación de Rutas de la API
 * Prefijo base definido en app.js (ej: /api)
 */

// --- Usuarios y Seguridad ---
router.use("/users", userRoutes);
router.use("/roles", rolRoutes);

// --- Maestros / Tablas de Referencia ---
router.use("/tipo-documento", tipoDocumentoRoutes);
router.use("/zonas", zonaRoutes);
router.use("/categories", categoryRoutes);

// --- Entidades de Negocio (CRUDs) ---
router.use("/employees", employeeRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/customers", customerRoutes);
router.use("/products", productRoutes); // <--- 2. RUTA DE PRODUCTOS REGISTRADA

export default router;

// import { Router } from "express";
// import userRoutes from "./user.routes.js";
// import rolRoutes from "./rol.routes.js";
// import tipoDocumentoRoutes from "./documentType.routes.js";
// import employeeRoutes from "./employee.routes.js";
// import supplierRoutes from "./supplier.routes.js";
// import zonaRoutes from "./zona.routes.js";
// import customerRoutes from "./customer.routes.js";
// import categoryRoutes from "./category.routes.js"; // <--- 1. IMPORTACIÓN AGREGADA

// const router = Router();

// /**
//  * Agrupación de Rutas de la API
//  * Prefijo base definido en app.js (ej: /api)
//  */

// // --- Usuarios y Seguridad ---
// router.use("/users", userRoutes);
// router.use("/roles", rolRoutes);

// // --- Maestros / Tablas de Referencia ---
// router.use("/tipo-documento", tipoDocumentoRoutes);
// router.use("/zonas", zonaRoutes);
// router.use("/categories", categoryRoutes); // <--- 2. RUTA REGISTRADA (Resuelve el error 404)

// // --- Entidades de Negocio (CRUDs) ---
// router.use("/employees", employeeRoutes);
// router.use("/suppliers", supplierRoutes);
// router.use("/customers", customerRoutes);

// export default router;

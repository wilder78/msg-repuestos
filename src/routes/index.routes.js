import { Router } from "express";
import userRoutes from "./user.routes.js";
import rolRoutes from "./rol.routes.js";
import tipoDocumentoRoutes from "./documentType.routes.js";
import employeeRoutes from "./employee.routes.js";
import supplierRoutes from "./supplier.routes.js";
import zonaRoutes from "./zona.routes.js";
import customerRoutes from "./customer.routes.js";
import categoryRoutes from "./category.routes.js";
import productRoutes from "./product.routes.js";

// 1. IMPORTACIÓN DE LAS RUTAS DE COMPRAS
import shoppingRoutes from "./shopping.routes.js";

// 2. IMPORTACIÓN DE LAS RUTAS DE PEDIDOS
import orderRoutes from "./order.routes.js";

// 3. IMPORTACIÓN DE LAS RUTAS DE DEVOLUCIONES
import returnRoutes from "./return.routes.js";

// 4. IMPORTACIÓN DE LAS RUTAS DE LOGÍSTICA (NUEVO)
import rutaRoutes from "./ruta.routes.js";

// ... otras importaciones
import saleRoutes from "./sale.routes.js";

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
router.use("/products", productRoutes);

// --- REGISTRO DE MOVIMIENTOS / TRANSACCIONES ---
// Gestión de Compras (Entrada de Stock)
router.use("/shopping", shoppingRoutes);

// Gestión de Pedidos / Ventas (Salida de Stock)
router.use("/orders", orderRoutes);

// Gestión de Devoluciones (Ajuste de Stock)
router.use("/returns", returnRoutes);

// --- 5. GESTIÓN DE LOGÍSTICA Y DESPACHOS (NUEVO) ---
router.use("/rutas", rutaRoutes);

// ...
router.use("/sales", saleRoutes);
// ...

export default router;

// import { Router } from "express";
// import userRoutes from "./user.routes.js";
// import rolRoutes from "./rol.routes.js";
// import tipoDocumentoRoutes from "./documentType.routes.js";
// import employeeRoutes from "./employee.routes.js";
// import supplierRoutes from "./supplier.routes.js";
// import zonaRoutes from "./zona.routes.js";
// import customerRoutes from "./customer.routes.js";
// import categoryRoutes from "./category.routes.js";
// import productRoutes from "./product.routes.js";

// // 1. IMPORTACIÓN DE LAS RUTAS DE COMPRAS
// import shoppingRoutes from "./shopping.routes.js";

// // 2. IMPORTACIÓN DE LAS RUTAS DE PEDIDOS
// import orderRoutes from "./order.routes.js";

// // 3. IMPORTACIÓN DE LAS RUTAS DE DEVOLUCIONES (NUEVO)
// import returnRoutes from "./return.routes.js";

// // ... otras importaciones
// import saleRoutes from "./sale.routes.js";

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
// router.use("/categories", categoryRoutes);

// // --- Entidades de Negocio (CRUDs) ---
// router.use("/employees", employeeRoutes);
// router.use("/suppliers", supplierRoutes);
// router.use("/customers", customerRoutes);
// router.use("/products", productRoutes);

// // --- 4. REGISTRO DE MOVIMIENTOS / TRANSACCIONES ---
// // Gestión de Compras (Entrada de Stock)
// router.use("/shopping", shoppingRoutes);

// // Gestión de Pedidos / Ventas (Salida de Stock)
// router.use("/orders", orderRoutes);

// // Gestión de Devoluciones (Ajuste de Stock - NUEVO)
// router.use("/returns", returnRoutes);

// // ...
// router.use("/sales", saleRoutes);
// // ...

// export default router;

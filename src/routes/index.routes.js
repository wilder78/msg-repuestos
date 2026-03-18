import { Router } from "express";

// --- Importaciones de Seguridad y Usuarios ---
import userRoutes from "./user.routes.js";
import rolRoutes from "./rol.routes.js";
import permissionRoutes from "./permission.routes.js";
import rolePermissionRoutes from "./rolePermission.routes.js";

// --- Importaciones de Maestros / Tablas de Referencia ---
import tipoDocumentoRoutes from "./documentType.routes.js";
import zonaRoutes from "./zona.routes.js";
import categoryRoutes from "./category.routes.js";

// --- Importaciones de Entidades de Negocio (CRUDS) ---
import employeeRoutes from "./employee.routes.js";
import supplierRoutes from "./supplier.routes.js";
import customerRoutes from "./customer.routes.js";
import creditRoutes from "./credit.routes.js"; 
import productRoutes from "./product.routes.js";

// --- Importaciones de Movimientos y Transacciones ---
import shoppingRoutes from "./shopping.routes.js";
import orderRoutes from "./order.routes.js";
import saleRoutes from "./sale.routes.js";
import returnRoutes from "./return.routes.js";

// --- Importaciones de Logística ---
import rutaRoutes from "./ruta.routes.js";

const router = Router();

/**
 * Agrupación de Rutas de la API
 * Prefijo base definido en app.js (ej: /api)
 */

// 1. SEGURIDAD Y ACCESOS
router.use("/users", userRoutes);
router.use("/roles", rolRoutes);
router.use("/permissions", permissionRoutes);
router.use("/role-permissions", rolePermissionRoutes);

// 2. MAESTROS / REFERENCIAS
router.use("/tipo-documento", tipoDocumentoRoutes);
router.use("/zonas", zonaRoutes);
router.use("/categories", categoryRoutes);

// 3. ENTIDADES DE NEGOCIO
router.use("/employees", employeeRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/customers", customerRoutes);
router.use("/credits", creditRoutes); 
router.use("/products", productRoutes);

// 4. TRANSACCIONES (ENTRADAS, SALIDAS Y VENTAS)
router.use("/shopping", shoppingRoutes);
router.use("/orders", orderRoutes);
router.use("/sales", saleRoutes);
router.use("/returns", returnRoutes);

// 5. LOGÍSTICA
router.use("/rutas", rutaRoutes);

export default router;

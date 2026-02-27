import { Router } from "express";
import supplierController from "../controllers/supplier.controllers.js";
// Importamos el middleware desde la ruta confirmada (singular: middleware)
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * Protección de rutas
 * Todas las rutas debajo de este middleware requerirán un token JWT válido
 */
router.use(verifyToken);

/**
 * @route   GET /api/suppliers
 * @desc    Obtener todos los proveedores
 */
router.get("/", supplierController.getAllSuppliers);

/**
 * @route   GET /api/suppliers/:id
 * @desc    Obtener un proveedor por su ID (id_proveedor)
 */
router.get("/:id", supplierController.getSupplierById);

/**
 * @route   POST /api/suppliers
 * @desc    Crear un nuevo proveedor
 */
router.post("/", supplierController.createSupplier);

/**
 * @route   PUT /api/suppliers/:id
 * @desc    Actualizar un proveedor existente
 */
router.put("/:id", supplierController.updateSupplier);

/**
 * @route   DELETE /api/suppliers/:id
 * @desc    Desactivación lógica del proveedor (campo activo = false)
 */
router.delete("/:id", supplierController.deleteSupplier);

export default router;

// import { Router } from "express";
// import supplierController from "../controllers/supplier.controllers.js";

// const router = Router();

// /**
//  * @route   GET /api/suppliers
//  * @desc    Obtener todos los proveedores
//  */
// router.get("/", supplierController.getAllSuppliers);

// /**
//  * @route   GET /api/suppliers/:id
//  * @desc    Obtener un proveedor por su ID (id_proveedor)
//  */
// router.get("/:id", supplierController.getSupplierById);

// /**
//  * @route   POST /api/suppliers
//  * @desc    Crear un nuevo proveedor
//  */
// router.post("/", supplierController.createSupplier);

// /**
//  * @route   PUT /api/suppliers/:id
//  * @desc    Actualizar un proveedor existente
//  */
// router.put("/:id", supplierController.updateSupplier);

// /**
//  * @route   DELETE /api/suppliers/:id
//  * @desc    Desactivación lógica del proveedor (campo activo = false)
//  */
// router.delete("/:id", supplierController.deleteSupplier);

// export default router;
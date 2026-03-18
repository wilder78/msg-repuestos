// import { Router } from "express";
// import rolePermissionController from "../controllers/rolePermission.controllers.js";
// import { verifyToken } from "../middleware/auth.middleware.js";

// const router = Router();

// /**
//  * Rutas para la gestión de asignación de permisos a roles
//  * Base URL: /api/role-permissions
//  */

// // 1. Obtener TODAS las asignaciones (ESTA ES LA QUE FALTA PARA EL GET /)
// router.get("/", [verifyToken], rolePermissionController.getAllAssignments);

// // 2. Obtener permisos de un rol por su ID (URL: /role/1)
// router.get("/role/:idRol", [verifyToken], rolePermissionController.getPermissionsByRole);

// // 3. Asignar un nuevo permiso a un rol
// router.post("/assign", [verifyToken], rolePermissionController.assignPermission);

// // 4. Revocar un permiso de un rol
// router.delete("/revoke", [verifyToken], rolePermissionController.revokePermission);

// export default router;

import { Router } from "express";
import rolePermissionController from "../controllers/rolePermission.controllers.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * Rutas para la gestión de asignación de permisos a roles
 * Base URL: /api/role-permissions
 */

// 1. Obtener TODAS las asignaciones (ESTA ES LA QUE FALTA PARA EL GET /)
router.get("/", rolePermissionController.getAllAssignments);

// 2. Obtener permisos de un rol por su ID (URL: /role/1)
router.get("/role/:idRol", rolePermissionController.getPermissionsByRole);

// 3. Asignar un nuevo permiso a un rol
router.post("/assign", rolePermissionController.assignPermission);

// 4. Revocar un permiso de un rol
router.delete("/revoke", rolePermissionController.revokePermission);

export default router;

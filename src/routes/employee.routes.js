// import { Router } from "express";
// import { employeeController } from "../controllers/employee.controllers.js";
// // Importamos el "portero" de seguridad desde la carpeta confirmada
// import { verifyToken } from "../middleware/auth.middleware.js";

// const router = Router();

// /**
//  * PROTECCIÓN DE RUTAS
//  * Aplicamos verifyToken de forma global para este router.
//  * A partir de aquí, todas las peticiones requieren el header 'Authorization: Bearer <token>'
//  */
// router.use(verifyToken);

// // --- DEFINICIÓN DE ENDPOINTS PROTEGIDOS ---

// // 1. Crear un empleado
// // POST http://localhost:3000/api/employees
// router.post("/", employeeController.create);

// // 2. Obtener todos los empleados
// // GET http://localhost:3000/api/employees
// router.get("/", employeeController.findAll);

// // 3. Obtener un empleado por su ID
// // GET http://localhost:3000/api/employees/:id
// router.get("/:id", employeeController.findOne);

// // 4. Actualizar un empleado por ID
// // PUT http://localhost:3000/api/employees/:id
// router.put("/:id", employeeController.update);

// // 5. Eliminar un empleado por ID
// // DELETE http://localhost:3000/api/employees/:id
// router.delete("/:id", employeeController.delete);

// export default router;


import { Router } from "express";
import { employeeController } from "../controllers/employee.controllers.js";
// Importamos el "portero" de seguridad desde la carpeta confirmada
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * PROTECCIÓN DE RUTAS
 * Aplicamos verifyToken de forma global para este router.
 * A partir de aquí, todas las peticiones requieren el header 'Authorization: Bearer <token>'
 */
// router.use(verifyToken);

// --- DEFINICIÓN DE ENDPOINTS PROTEGIDOS ---

// 1. Crear un empleado
// POST http://localhost:3000/api/employees
router.post("/", employeeController.create);

// 2. Obtener todos los empleados
// GET http://localhost:3000/api/employees
router.get("/", employeeController.findAll);

// 3. Obtener un empleado por su ID
// GET http://localhost:3000/api/employees/:id
router.get("/:id", employeeController.findOne);

// 4. Actualizar un empleado por ID
// PUT http://localhost:3000/api/employees/:id
router.put("/:id", employeeController.update);

// 5. Eliminar un empleado por ID
// DELETE http://localhost:3000/api/employees/:id
router.delete("/:id", employeeController.delete);

export default router;

import { Router } from "express";
import { employeeController } from "../controllers/employee.controllers.js";

const router = Router();

// --- DEFINICIÓN DE ENDPOINTS ---

// 1. Crear un empleado
// POST http://localhost:3000/api/employees
router.post("/", employeeController.create);

// 2. Obtener todos los empleados
// GET http://localhost:3000/api/employees
router.get("/", employeeController.findAll);

// 3. Obtener un empleado por su ID
// GET http://localhost:3000/api/employees/5
router.get("/:id", employeeController.findOne);

// 4. Actualizar un empleado por ID
// PUT http://localhost:3000/api/employees/5
router.put("/:id", employeeController.update);

// 5. Eliminar un empleado por ID
// DELETE http://localhost:3000/api/employees/5
router.delete("/:id", employeeController.delete);

export default router;
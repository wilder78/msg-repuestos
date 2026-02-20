import { response } from "express";
import db from "../models/index.model.js"; 

const supplierController = {
  // 1. Obtener todos los proveedores
  getAllSuppliers: async (req, res = response) => {
    try {
      // Verificación de seguridad: ¿Está el modelo cargado?
      if (!db.Supplier) {
        throw new Error("El modelo Supplier no está inicializado en la base de datos.");
      }

      const suppliers = await db.Supplier.findAll({
        include: [
          {
            model: db.TipoDocumento,
            as: "tipoDocumento",
            attributes: ["sigla", "descripcion"],
          },
        ],
      });
      return res.status(200).json(suppliers);
    } catch (error) {
      console.error("Error en getAllSuppliers:", error);
      return res.status(500).json({ 
        status: "error",
        message: "Error al obtener proveedores", 
        error: error.message 
      });
    }
  },

  // 2. Obtener un proveedor por ID
  getSupplierById: async (req, res = response) => {
    const { id } = req.params;
    try {
      const supplier = await db.Supplier.findByPk(id, {
        include: [{ model: db.TipoDocumento, as: "tipoDocumento" }],
      });
      
      if (!supplier) {
        return res.status(404).json({ 
          status: "error",
          message: `Proveedor con ID ${id} no encontrado` 
        });
      }
      return res.json(supplier);
    } catch (error) {
      return res.status(500).json({ 
        status: "error",
        message: "Error al obtener el proveedor", 
        error: error.message 
      });
    }
  },

  // 3. Crear un nuevo proveedor
  createSupplier: async (req, res = response) => {
    try {
      // Validamos que el body no venga vacío (evita notNull Violations tontas)
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
          status: "error",
          message: "El cuerpo de la solicitud no puede estar vacío."
        });
      }

      const newSupplier = await db.Supplier.create(req.body);
      return res.status(201).json({
        status: "success",
        message: "Proveedor creado con éxito",
        data: newSupplier,
      });
    } catch (error) {
      // Manejo específico para errores de Sequelize (UniqueConstraint, NotNull, etc.)
      const errorMsg = error.name === 'SequelizeValidationError' 
        ? error.errors.map(e => e.message).join(", ")
        : error.message;

      return res.status(400).json({ 
        status: "error",
        message: "No se pudo crear el proveedor. Verifique los datos enviados.",
        error: errorMsg 
      });
    }
  },

  // 4. Actualizar proveedor
  updateSupplier: async (req, res = response) => {
    const { id } = req.params;
    try {
      const [updatedRows] = await db.Supplier.update(req.body, {
        where: { idProveedor: id },
      });

      if (updatedRows === 0) {
        return res.status(404).json({ 
          status: "error",
          message: "Proveedor no encontrado o no hubo cambios en los datos." 
        });
      }

      const updatedSupplier = await db.Supplier.findByPk(id);
      return res.json({ 
        status: "success",
        message: "Proveedor actualizado con éxito", 
        data: updatedSupplier 
      });
    } catch (error) {
      return res.status(500).json({ 
        status: "error",
        message: "Error al actualizar el proveedor", 
        error: error.message 
      });
    }
  },

  // 5. Eliminar (Desactivar) proveedor
  deleteSupplier: async (req, res = response) => {
    const { id } = req.params;
    try {
      const result = await db.Supplier.update({ activo: false }, {
        where: { idProveedor: id }
      });

      if (result[0] === 0) {
        return res.status(404).json({ 
          status: "error",
          message: "No se encontró el proveedor para desactivar." 
        });
      }

      return res.json({ 
        status: "success",
        message: "Proveedor desactivado correctamente" 
      });
    } catch (error) {
      return res.status(500).json({ 
        status: "error",
        message: "Error al desactivar el proveedor", 
        error: error.message 
      });
    }
  },
};

export default supplierController;

// import { response } from "express";
// import db from "../models/index.model.js"; 

// const supplierController = {
//   // 1. Obtener todos los proveedores
//   getAllSuppliers: async (req, res = response) => {
//     try {
//       // Accedemos directamente a db.Supplier dentro del scope de la función
//       const suppliers = await db.Supplier.findAll({
//         include: [
//           {
//             model: db.TipoDocumento,
//             as: "tipoDocumento",
//             attributes: ["sigla", "descripcion"],
//           },
//         ],
//       });
//       res.json(suppliers);
//     } catch (error) {
//       res.status(500).json({ 
//         message: "Error al obtener proveedores", 
//         error: error.message 
//       });
//     }
//   },

//   // 2. Obtener un proveedor por ID
//   getSupplierById: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       const supplier = await db.Supplier.findByPk(id, {
//         include: [{ model: db.TipoDocumento, as: "tipoDocumento" }],
//       });
//       if (!supplier) {
//         return res.status(404).json({ message: "Proveedor no encontrado" });
//       }
//       res.json(supplier);
//     } catch (error) {
//       res.status(500).json({ message: "Error al obtener el proveedor", error: error.message });
//     }
//   },

//   // 3. Crear un nuevo proveedor
//   createSupplier: async (req, res = response) => {
//     try {
//       const newSupplier = await db.Supplier.create(req.body);
//       res.status(201).json({
//         message: "Proveedor creado con éxito",
//         data: newSupplier,
//       });
//     } catch (error) {
//       res.status(400).json({ message: "Error al crear proveedor", error: error.message });
//     }
//   },

//   // 4. Actualizar proveedor
//   updateSupplier: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       const [updated] = await db.Supplier.update(req.body, {
//         where: { idProveedor: id },
//       });
//       if (updated === 0) {
//         return res.status(404).json({ message: "Proveedor no encontrado o sin cambios" });
//       }
//       const updatedSupplier = await db.Supplier.findByPk(id);
//       res.json({ message: "Proveedor actualizado", data: updatedSupplier });
//     } catch (error) {
//       res.status(500).json({ message: "Error al actualizar", error: error.message });
//     }
//   },

//   // 5. Eliminar (Desactivar) proveedor
//   deleteSupplier: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       await db.Supplier.update({ activo: false }, {
//         where: { idProveedor: id }
//       });
//       res.json({ message: "Proveedor desactivado correctamente" });
//     } catch (error) {
//       res.status(500).json({ message: "Error al eliminar", error: error.message });
//     }
//   },
// };

// export default supplierController;

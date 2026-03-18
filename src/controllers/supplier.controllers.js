import { response } from "express";
import db from "../models/index.model.js";

const { Supplier, TipoDocumento } = db;

const supplierController = {
  // 1. Obtener todos los proveedores
  getAllSuppliers: async (req, res = response) => {
    try {
      const suppliers = await Supplier.findAll({
        include: [
          {
            model: TipoDocumento,
            as: "tipoDocumento",
            attributes: ["sigla", "descripcion"],
          },
        ],
        // Se usa el nombre del atributo definido en el modelo
        order: [["idProveedor", "ASC"]],
      });
      res.json(suppliers);
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 2. Obtener un proveedor por ID
  getSupplierById: async (req, res = response) => {
    try {
      const { id } = req.params;
      const supplier = await Supplier.findByPk(id, {
        include: [{ model: TipoDocumento, as: "tipoDocumento" }],
      });

      if (!supplier)
        return res.status(404).json({ message: "Proveedor no encontrado" });
      res.json(supplier);
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 3. Crear un nuevo proveedor
  createSupplier: async (req, res = response) => {
    try {
      const newSupplier = await Supplier.create(req.body);
      res.status(201).json({ ok: true, data: newSupplier });
    } catch (error) {
      res.status(400).json({ ok: false, message: error.message });
    }
  },

  // 4. Actualizar proveedor
  updateSupplier: async (req, res = response) => {
    try {
      const { id } = req.params;
      // Evitamos que intenten actualizar la Primary Key manualmente
      const { idProveedor, ...dataToUpdate } = req.body;

      const [updatedRows] = await Supplier.update(dataToUpdate, {
        where: { idProveedor: id },
      });

      if (updatedRows === 0)
        return res.status(404).json({ message: "Proveedor no encontrado" });

      const updatedSupplier = await Supplier.findByPk(id);
      res.json({ ok: true, data: updatedSupplier });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 5. Desactivar proveedor (Borrado Lógico)
  deleteSupplier: async (req, res = response) => {
    try {
      const { id } = req.params;
      const [result] = await Supplier.update(
        { activo: 0 },
        {
          where: { idProveedor: id },
        },
      );

      if (result === 0)
        return res.status(404).json({ message: "No se encontró el proveedor" });
      res.json({ ok: true, message: "Proveedor desactivado" });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },
};

// EXPORTACIÓN POR DEFECTO: Crucial para evitar el SyntaxError
export default supplierController;

// import { response } from "express";
// import db from "../models/index.model.js";

// const supplierController = {
//   // 1. Obtener todos los proveedores
//   getAllSuppliers: async (req, res = response) => {
//     try {
//       if (!db.Supplier) {
//         throw new Error("El modelo Supplier no está inicializado.");
//       }

//       const suppliers = await db.Supplier.findAll({
//         include: [
//           {
//             model: db.TipoDocumento,
//             as: "tipoDocumento",
//             attributes: ["sigla", "descripcion"],
//           },
//         ],
//         // Sincronizado: idProveedor -> id_proveedor
//         order: [["id_proveedor", "ASC"]],
//       });
//       return res.status(200).json(suppliers);
//     } catch (error) {
//       console.error("Error en getAllSuppliers:", error);
//       return res.status(500).json({
//         status: "error",
//         message: "Error al obtener proveedores",
//         error: error.message,
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
//         return res.status(404).json({
//           status: "error",
//           message: `Proveedor con ID ${id} no encontrado`,
//         });
//       }
//       return res.json(supplier);
//     } catch (error) {
//       return res.status(500).json({
//         status: "error",
//         message: "Error al obtener el proveedor",
//         error: error.message,
//       });
//     }
//   },

//   // 3. Crear un nuevo proveedor
//   createSupplier: async (req, res = response) => {
//     try {
//       if (!req.body || Object.keys(req.body).length === 0) {
//         return res.status(400).json({
//           status: "error",
//           message: "El cuerpo de la solicitud no puede estar vacío.",
//         });
//       }

//       // IMPORTANTE: Al usar req.body directamente, Sequelize usará las claves
//       // id_tipo_documento, nombre_empresa, etc., que definimos en el modelo.
//       const newSupplier = await db.Supplier.create(req.body);

//       return res.status(201).json({
//         status: "success",
//         message: "Proveedor creado con éxito",
//         data: newSupplier,
//       });
//     } catch (error) {
//       const errorMsg =
//         error.name === "SequelizeValidationError"
//           ? error.errors.map((e) => e.message).join(", ")
//           : error.message;

//       return res.status(400).json({
//         status: "error",
//         message: "No se pudo crear el proveedor.",
//         error: errorMsg,
//       });
//     }
//   },

//   // 4. Actualizar proveedor
//   updateSupplier: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       // Sincronizado: idProveedor -> id_proveedor
//       const { id_proveedor, ...dataToUpdate } = req.body;

//       const [updatedRows] = await db.Supplier.update(dataToUpdate, {
//         where: { id_proveedor: id },
//       });

//       if (updatedRows === 0) {
//         return res.status(404).json({
//           status: "error",
//           message: "Proveedor no encontrado o sin cambios.",
//         });
//       }

//       const updatedSupplier = await db.Supplier.findByPk(id);
//       return res.json({
//         status: "success",
//         message: "Proveedor actualizado con éxito",
//         data: updatedSupplier,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         status: "error",
//         message: "Error al actualizar el proveedor",
//         error: error.message,
//       });
//     }
//   },

//   // 5. Desactivar proveedor (Soft Delete)
//   deleteSupplier: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       // Sincronizado: idProveedor -> id_proveedor
//       const [result] = await db.Supplier.update(
//         { activo: 0 },
//         {
//           where: { id_proveedor: id },
//         },
//       );

//       if (result === 0) {
//         return res.status(404).json({
//           status: "error",
//           message: "No se encontró el proveedor.",
//         });
//       }

//       return res.json({
//         status: "success",
//         message: "Proveedor desactivado correctamente",
//       });
//     } catch (error) {
//       return res.status(500).json({
//         status: "error",
//         message: "Error al desactivar el proveedor",
//         error: error.message,
//       });
//     }
//   },
// };

// export default supplierController;

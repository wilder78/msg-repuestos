import { response } from "express";
import db from "../models/index.model.js";

const { Supplier, TipoDocumento } = db;

const supplierController = {
  // 1. Obtener todos los proveedores registrados
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
        // Mantiene id_proveedor como clave de ordenación
        order: [["id_proveedor", "ASC"]],
      });
      return res.json(suppliers);
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 2. Obtener un proveedor específico por su ID
  getSupplierById: async (req, res = response) => {
    try {
      const { id } = req.params;
      const supplier = await Supplier.findByPk(id, {
        include: [{ model: TipoDocumento, as: "tipoDocumento" }],
      });

      if (!supplier) {
        return res.status(404).json({ message: "Proveedor no encontrado" });
      }
      return res.json(supplier);
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 3. Registrar un nuevo proveedor
  createSupplier: async (req, res = response) => {
    try {
      // El modelo ahora espera 'direccion' e 'id_estado'
      const newSupplier = await Supplier.create(req.body);
      return res.status(201).json({ ok: true, data: newSupplier });
    } catch (error) {
      return res.status(400).json({ ok: false, message: error.message });
    }
  },

  // 4. Actualizar la información de un proveedor
  updateSupplier: async (req, res = response) => {
    try {
      const { id } = req.params;
      // Desestructuramos para evitar actualizar la PK accidentalmente
      const { id_proveedor, idProveedor, ...dataToUpdate } = req.body;

      const [updatedRows] = await Supplier.update(dataToUpdate, {
        where: { id_proveedor: id },
      });

      if (updatedRows === 0) {
        return res
          .status(404)
          .json({ message: "Proveedor no encontrado o sin cambios" });
      }

      const updatedSupplier = await Supplier.findByPk(id);
      return res.json({ ok: true, data: updatedSupplier });
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 5. Desactivar proveedor (Borrado Lógico)
  deleteSupplier: async (req, res = response) => {
    try {
      const { id } = req.params;

      // CORRECCIÓN CRÍTICA: Se cambió 'activo' por 'id_estado'
      const [result] = await Supplier.update(
        { id_estado: 0 },
        {
          where: { id_proveedor: id },
        },
      );

      if (result === 0) {
        return res.status(404).json({ message: "No se encontró el proveedor" });
      }
      return res.json({
        ok: true,
        message: "Proveedor desactivado correctamente",
      });
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },
};

export default supplierController;

// import { response } from "express";
// import db from "../models/index.model.js";

// const { Supplier, TipoDocumento } = db;

// const supplierController = {
//   // 1. Obtener todos los proveedores registrados
//   getAllSuppliers: async (req, res = response) => {
//     try {
//       const suppliers = await Supplier.findAll({
//         include: [
//           {
//             model: TipoDocumento,
//             as: "tipoDocumento",
//             attributes: ["sigla", "descripcion"],
//           },
//         ],
//         // CORRECCIÓN: Se cambió 'idProveedor' por 'id_proveedor'
//         order: [["id_proveedor", "ASC"]],
//       });
//       return res.json(suppliers);
//     } catch (error) {
//       return res.status(500).json({ ok: false, message: error.message });
//     }
//   },

//   // 2. Obtener un proveedor específico por su ID
//   getSupplierById: async (req, res = response) => {
//     try {
//       const { id } = req.params;
//       const supplier = await Supplier.findByPk(id, {
//         include: [{ model: TipoDocumento, as: "tipoDocumento" }],
//       });

//       if (!supplier) {
//         return res.status(404).json({ message: "Proveedor no encontrado" });
//       }
//       return res.json(supplier);
//     } catch (error) {
//       return res.status(500).json({ ok: false, message: error.message });
//     }
//   },

//   // 3. Registrar un nuevo proveedor
//   createSupplier: async (req, res = response) => {
//     try {
//       // Sequelize usará automáticamente 'field' definido en el modelo para mapear req.body
//       const newSupplier = await Supplier.create(req.body);
//       return res.status(201).json({ ok: true, data: newSupplier });
//     } catch (error) {
//       return res.status(400).json({ ok: false, message: error.message });
//     }
//   },

//   // 4. Actualizar la información de un proveedor
//   updateSupplier: async (req, res = response) => {
//     try {
//       const { id } = req.params;
//       // Extraemos idProveedor (en caso de que venga) para evitar intentar actualizar la PK
//       const { id_proveedor, idProveedor, ...dataToUpdate } = req.body;

//       const [updatedRows] = await Supplier.update(dataToUpdate, {
//         // CORRECCIÓN: Se usa 'id_proveedor' como nombre de columna/propiedad
//         where: { id_proveedor: id },
//       });

//       if (updatedRows === 0) {
//         return res
//           .status(404)
//           .json({ message: "Proveedor no encontrado o sin cambios" });
//       }

//       const updatedSupplier = await Supplier.findByPk(id);
//       return res.json({ ok: true, data: updatedSupplier });
//     } catch (error) {
//       return res.status(500).json({ ok: false, message: error.message });
//     }
//   },

//   // 5. Desactivar proveedor (Borrado Lógico)
//   deleteSupplier: async (req, res = response) => {
//     try {
//       const { id } = req.params;
//       const [result] = await Supplier.update(
//         { activo: 0 },
//         {
//           // CORRECCIÓN: Se cambió 'idProveedor' por 'id_proveedor'
//           where: { id_proveedor: id },
//         },
//       );

//       if (result === 0) {
//         return res.status(404).json({ message: "No se encontró el proveedor" });
//       }
//       return res.json({
//         ok: true,
//         message: "Proveedor desactivado correctamente",
//       });
//     } catch (error) {
//       return res.status(500).json({ ok: false, message: error.message });
//     }
//   },
// };

// export default supplierController;

import { response } from "express";
import db from "../models/index.model.js";

const { Supplier, TipoDocumento } = db;

const supplierController = {
  // 1. Obtener todos los proveedores registrados (incluye tipo de documento)
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
        order: [["idProveedor", "ASC"]],
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

  // 3. Registrar un nuevo proveedor en la base de datos
  createSupplier: async (req, res = response) => {
    try {
      const newSupplier = await Supplier.create(req.body);
      return res.status(201).json({ ok: true, data: newSupplier });
    } catch (error) {
      return res.status(400).json({ ok: false, message: error.message });
    }
  },

  // 4. Actualizar la información de un proveedor existente
  updateSupplier: async (req, res = response) => {
    try {
      const { id } = req.params;
      const { idProveedor, ...dataToUpdate } = req.body;

      const [updatedRows] = await Supplier.update(dataToUpdate, {
        where: { idProveedor: id },
      });

      if (updatedRows === 0) {
        return res.status(404).json({ message: "Proveedor no encontrado" });
      }

      const updatedSupplier = await Supplier.findByPk(id);
      return res.json({ ok: true, data: updatedSupplier });
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 5. Desactivar proveedor (Borrado Lógico: activo = 0)
  deleteSupplier: async (req, res = response) => {
    try {
      const { id } = req.params;
      const [result] = await Supplier.update(
        { activo: 0 },
        { where: { idProveedor: id } }
      );

      if (result === 0) {
        return res.status(404).json({ message: "No se encontró el proveedor" });
      }
      return res.json({ ok: true, message: "Proveedor desactivado correctamente" });
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },
};

export default supplierController;
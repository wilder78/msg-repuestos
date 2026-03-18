import { response } from "express";
import db from "../models/index.model.js";
import { generateReturnPDF } from "../utils/pdf.service.js";

const returnController = {
  // 1. Crear una nueva devolución (Procesamiento de Stock y PDF)
  createReturn: async (req, res = response) => {
    const t = await db.sequelize.transaction();

    try {
      const { detalles, ...header } = req.body;

      // Validar existencia de la venta
      const ventaExiste = await db.Sale.findByPk(header.idVenta);
      if (!ventaExiste) {
        if (!t.finished) await t.rollback();
        return res.status(404).json({
          status: "error",
          message: `La venta con ID ${header.idVenta} no existe.`
        });
      }

      // Crear cabecera de la devolución
      const newReturn = await db.CustomerReturn.create(header, { transaction: t });

      // Procesar detalles de productos devueltos
      for (const item of detalles) {
        await db.ReturnDetail.create({
          idDevolucion: newReturn.idDevolucion,
          idProducto: item.idProducto,
          cantidadDevuelta: item.cantidadDevuelta,
          precioUnitario: item.precioUnitario,
          subtotalLinea: item.subtotalLinea
        }, { transaction: t });
      }

      await t.commit();

      // Generación de comprobante PDF (Post-transacción)
      let pdfUrl = null;
      try {
        const pdfName = await generateReturnPDF(newReturn, detalles);
        pdfUrl = `/reports/returns/${pdfName}`;
      } catch (pdfError) {
        console.error("⚠️ Error generando PDF:", pdfError);
      }

      return res.status(201).json({
        status: "success",
        message: "Devolución registrada con éxito. Stock actualizado automáticamente.",
        pdfUrl: pdfUrl,
        data: newReturn
      });

    } catch (error) {
      if (!t.finished) await t.rollback();
      
      console.error("❌ Error en createReturn:", error);
      
      const errorMsg = error.name === 'SequelizeForeignKeyConstraintError' 
        ? "Error de integridad: Verifique que el ID de Venta, Cliente y Producto sean válidos."
        : error.message;

      return res.status(500).json({
        status: "error",
        message: "No se pudo procesar la devolución.",
        error: errorMsg
      });
    }
  },

  // 2. Obtener historial completo de devoluciones con detalles y productos
  getAllReturns: async (req, res = response) => {
    try {
      const returns = await db.CustomerReturn.findAll({
        include: [
          { 
            model: db.ReturnDetail, 
            as: "detalles",
            include: [{ model: db.Product, as: "producto", attributes: ["nombre", "referencia"] }] 
          },
          { model: db.Customer, as: "cliente", attributes: ["razonSocial"] },
          { model: db.Sale, as: "venta", attributes: ["idVenta", "fechaVenta"] }
        ],
        order: [["idDevolucion", "DESC"]]
      });
      return res.json(returns);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al obtener el historial de devoluciones",
        error: error.message
      });
    }
  }
};

export default returnController;
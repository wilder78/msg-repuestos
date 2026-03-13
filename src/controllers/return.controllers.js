import { response } from "express";
import db from "../models/index.model.js";
// Importamos el servicio de PDF (asegúrate de que la ruta sea correcta)
import { generateReturnPDF } from "../utils/pdf.service.js";

const returnController = {
  // Crear una nueva devolución
  createReturn: async (req, res = response) => {
    const t = await db.sequelize.transaction();

    try {
      const { detalles, ...header } = req.body;

      // 1. Validar que la venta exista
      const ventaExiste = await db.Sale.findByPk(header.idVenta);
      if (!ventaExiste) {
        await t.rollback();
        return res.status(404).json({
          status: "error",
          message: `La venta con ID ${header.idVenta} no existe.`
        });
      }

      // 2. Crear la cabecera de la devolución
      const newReturn = await db.CustomerReturn.create(header, { transaction: t });

      // 3. Procesar detalles
      for (const item of detalles) {
        await db.ReturnDetail.create({
          idDevolucion: newReturn.idDevolucion,
          idProducto: item.idProducto,
          cantidadDevuelta: item.cantidadDevuelta,
          precioUnitario: item.precioUnitario,
          subtotalLinea: item.subtotalLinea
        }, { transaction: t });
        
        // El stock se actualiza vía TRIGGER en la BD
      }

      // 4. Confirmamos la transacción en la base de datos
      await t.commit();

      // 5. GENERACIÓN DEL PDF (Fuera de la transacción para no bloquear la BD)
      let pdfUrl = null;
      try {
        const pdfName = await generateReturnPDF(newReturn, detalles);
        pdfUrl = `/reports/returns/${pdfName}`;
        
        // Opcional: Si tienes un campo rutaPdf en la tabla devoluciones, podrías actualizarlo aquí:
        // await newReturn.update({ rutaPdf: pdfUrl });
      } catch (pdfError) {
        console.error("Error generando PDF:", pdfError);
        // No lanzamos error 500 porque la devolución ya se guardó en la BD
      }

      return res.status(201).json({
        status: "success",
        message: "Devolución registrada con éxito. El stock fue actualizado y el PDF generado.",
        pdfUrl: pdfUrl, // Enviamos la URL al frontend/Postman
        data: newReturn
      });

    } catch (error) {
      // Si algo falla antes del commit, revertimos
      if (!t.finished) await t.rollback();
      
      console.error("Error en createReturn:", error);
      
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

  // Obtener historial de devoluciones
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
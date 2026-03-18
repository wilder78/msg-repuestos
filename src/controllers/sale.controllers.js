import { response } from "express";
import db from "../models/index.model.js";

const saleController = {
  // 1. Crear una Venta a partir de un Pedido (Cierre de Facturación)
  createSale: async (req, res = response) => {
    const t = await db.sequelize.transaction();
    try {
      const { idPedido, idFormaPago, totalVenta, rutaPdf } = req.body;

      const order = await db.Order.findByPk(idPedido);
      if (!order) {
        if (!t.finished) await t.rollback();
        return res.status(404).json({
          status: "error",
          message: "El pedido especificado no existe."
        });
      }

      const newSale = await db.Sale.create({
        idPedido,
        idFormaPago,
        totalVenta: totalVenta || order.total_neto,
        idEstadoVenta: 1, 
        rutaPdf
      }, { transaction: t });

      await db.Order.update(
        { id_estado_pedido: 3 }, 
        { where: { id_pedido: idPedido }, transaction: t }
      );

      await t.commit();
      return res.status(201).json({
        status: "success",
        message: "Venta registrada con éxito.",
        data: newSale
      });

    } catch (error) {
      if (!t.finished) await t.rollback();
      return res.status(500).json({
        status: "error",
        message: "Error al procesar la venta",
        error: error.message
      });
    }
  },

  // 2. Obtener todas las ventas con sus devoluciones y pedidos relacionados
  getAllSales: async (req, res = response) => {
    try {
      const sales = await db.Sale.findAll({
        include: [
          { model: db.Order, as: "pedido" },
          { model: db.CustomerReturn, as: "devoluciones" }
        ],
        order: [["idVenta", "DESC"]]
      });
      return res.json(sales);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al obtener las ventas",
        error: error.message
      });
    }
  },

  // 3. Obtener el detalle de una venta específica por su ID
  getSaleById: async (req, res = response) => {
    try {
      const { id } = req.params;
      const sale = await db.Sale.findByPk(id, {
        include: ["pedido", "devoluciones"]
      });

      if (!sale) {
        return res.status(404).json({
          status: "error",
          message: "Venta no encontrada"
        });
      }
      return res.json(sale);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al obtener la venta",
        error: error.message
      });
    }
  }
};

export default saleController;
import db from "../models/index.model.js";

const ESTADOS_VALIDOS = {
  SOLICITADO: "Solicitado",
  RECIBIDO: "Recibido",
  COMPLETADA: "Completada",
};

const shoppingController = {
  // 1. Registrar una nueva compra o pedido (Inicia transacción)
  createPurchase: async (req, res) => {
    const t = await db.sequelize.transaction();

    try {
      const { id_proveedor, id_empleado, total, productos, estado_compra } = req.body;

      if (!productos || productos.length === 0) {
        if (!t.finished) await t.rollback();
        return res.status(400).json({ 
          ok: false, 
          msg: "La compra debe tener al menos un producto." 
        });
      }

      const inputEstado = estado_compra ? estado_compra.toString().trim().toLowerCase() : "solicitado";
      const estadoParaDB = inputEstado.charAt(0).toUpperCase() + inputEstado.slice(1);

      if (!Object.values(ESTADOS_VALIDOS).includes(estadoParaDB)) {
        if (!t.finished) await t.rollback();
        return res.status(400).json({ ok: false, msg: "Estado de compra inválido." });
      }

      const nuevaCompra = await db.Purchase.create(
        {
          idProveedor: id_proveedor,
          idEmpleado: id_empleado,
          estadoCompra: estadoParaDB,
          total: total,
        },
        { transaction: t }
      );

      const detallesData = productos.map((item) => ({
        idCompra: nuevaCompra.idCompra,
        idProducto: item.id_producto,
        cantidad: item.cantidad,
        costoUnitario: item.costo_unitario,
        subtotal: item.cantidad * item.costo_unitario,
      }));

      await db.PurchaseDetail.bulkCreate(detallesData, { transaction: t });

      await t.commit();

      return res.status(201).json({
        ok: true,
        msg: estadoParaDB === ESTADOS_VALIDOS.SOLICITADO
          ? "Pedido registrado (SOLICITADO). Stock sin cambios."
          : "Compra registrada. Stock actualizado.",
        id_compra: nuevaCompra.idCompra,
        estado_registrado: estadoParaDB,
      });
    } catch (error) {
      if (!t.finished) await t.rollback();
      console.error("❌ Error en createPurchase:", error);
      return res.status(500).json({
        ok: false,
        msg: "Error al crear la compra",
        error: error.message,
      });
    }
  },

  // 2. Confirmar recepción de mercancía y actualizar stock
  confirmReceipt: async (req, res) => {
    const { id } = req.params;
    const t = await db.sequelize.transaction();

    try {
      const compra = await db.Purchase.findByPk(id, {
        include: [{ model: db.PurchaseDetail, as: "detalles" }],
      });

      if (!compra) {
        if (!t.finished) await t.rollback();
        return res.status(404).json({ ok: false, msg: "Compra no encontrada." });
      }

      if (compra.estadoCompra !== ESTADOS_VALIDOS.SOLICITADO) {
        if (!t.finished) await t.rollback();
        return res.status(400).json({
          ok: false,
          msg: `Solo se pueden confirmar pedidos 'Solicitado'. Estado actual: ${compra.estadoCompra}`,
        });
      }

      await compra.update(
        { estadoCompra: ESTADOS_VALIDOS.RECIBIDO },
        { transaction: t }
      );

      const updatePromises = compra.detalles.map((item) =>
        db.Product.increment("stock_buen_estado", {
          by: item.cantidad,
          where: { id_producto: item.idProducto },
          transaction: t,
        })
      );

      await Promise.all(updatePromises);
      await t.commit();

      return res.json({ ok: true, msg: "Recepción confirmada y stock incrementado." });
    } catch (error) {
      if (!t.finished) await t.rollback();
      return res.status(500).json({ ok: false, error: error.message });
    }
  },

  // 3. Listar historial de compras con proveedores y productos
  getAllPurchases: async (req, res) => {
    try {
      const purchases = await db.Purchase.findAll({
        include: [
          {
            model: db.PurchaseDetail,
            as: "detalles",
            include: [{ model: db.Product, as: "producto", attributes: ["nombre", "marca"] }],
          },
          { model: db.Supplier, as: "proveedor", attributes: ["nombre_empresa"] },
        ],
        order: [["idCompra", "DESC"]],
      });
      return res.json({ ok: true, data: purchases });
    } catch (error) {
      console.error("❌ Error en getAllPurchases:", error);
      return res.status(500).json({ ok: false, error: error.message });
    }
  },

  // 4. Obtener detalle de una compra específica por ID
  getPurchaseById: async (req, res) => {
    try {
      const { id } = req.params;
      const purchase = await db.Purchase.findByPk(id, {
        include: [
          {
            model: db.PurchaseDetail,
            as: "detalles",
            include: [{ model: db.Product, as: "producto" }],
          },
          { model: db.Supplier, as: "proveedor", attributes: ["nombre_empresa", "contacto"] },
          { model: db.Empleado, as: "empleado", attributes: ["nombre", "apellido"] },
        ],
      });

      if (!purchase) {
        return res.status(404).json({ ok: false, msg: "Compra inexistente." });
      }

      return res.json({ ok: true, data: purchase });
    } catch (error) {
      return res.status(500).json({ ok: false, error: error.message });
    }
  },
};

export default shoppingController;
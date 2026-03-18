import db from "../models/index.model.js";

const ESTADOS_VALIDOS = {
  SOLICITADO: "Solicitado",
  RECIBIDO: "Recibido",
  COMPLETADA: "Completada",
};

/**
 * 1. REGISTRAR COMPRA (PEDIDO)
 */
const createPurchase = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const { id_proveedor, id_empleado, total, productos, estado_compra } =
      req.body;

    if (!productos || productos.length === 0) {
      if (!t.finished) await t.rollback();
      return res
        .status(400)
        .json({ ok: false, msg: "La compra debe tener al menos un producto." });
    }

    const inputEstado = estado_compra
      ? estado_compra.toString().trim().toLowerCase()
      : "solicitado";
    const estadoParaDB =
      inputEstado.charAt(0).toUpperCase() + inputEstado.slice(1);

    if (!Object.values(ESTADOS_VALIDOS).includes(estadoParaDB)) {
      if (!t.finished) await t.rollback();
      return res
        .status(400)
        .json({ ok: false, msg: "Estado de compra inválido." });
    }

    const nuevaCompra = await db.Purchase.create(
      {
        idProveedor: id_proveedor,
        idEmpleado: id_empleado,
        estadoCompra: estadoParaDB,
        total: total,
      },
      { transaction: t },
    );

    if (!nuevaCompra.idCompra) {
      throw new Error("No se pudo obtener el ID de la nueva compra.");
    }

    const detallesData = productos.map((item) => ({
      idCompra: nuevaCompra.idCompra,
      id_compra: nuevaCompra.idCompra,
      idProducto: item.id_producto,
      id_producto: item.id_producto,
      cantidad: item.cantidad,
      costoUnitario: item.costo_unitario,
      subtotal: item.cantidad * item.costo_unitario,
    }));

    await db.PurchaseDetail.bulkCreate(detallesData, { transaction: t });

    await t.commit();

    res.status(201).json({
      ok: true,
      msg:
        estadoParaDB === ESTADOS_VALIDOS.SOLICITADO
          ? "Pedido registrado (SOLICITADO). Stock sin cambios."
          : "Compra registrada. Stock actualizado por Trigger.",
      id_compra: nuevaCompra.idCompra,
      estado_registrado: estadoParaDB,
    });
  } catch (error) {
    if (!t.finished) await t.rollback();
    console.error("❌ Error en createPurchase:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear la compra",
      error: error.message,
    });
  }
};

/**
 * 2. CONFIRMAR RECEPCIÓN
 */
const confirmReceipt = async (req, res) => {
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
      { transaction: t },
    );

    const updatePromises = compra.detalles.map((item) =>
      db.Product.increment("stock_buen_estado", {
        by: item.cantidad,
        where: { id_producto: item.idProducto || item.id_producto },
        transaction: t,
      }),
    );

    await Promise.all(updatePromises);
    await t.commit();

    res.json({ ok: true, msg: "Recepción confirmada y stock incrementado." });
  } catch (error) {
    if (!t.finished) await t.rollback();
    res.status(500).json({ ok: false, error: error.message });
  }
};

/**
 * 3. LISTAR TODAS LAS COMPRAS
 */
const getAllPurchases = async (req, res) => {
  try {
    const purchases = await db.Purchase.findAll({
      include: [
        {
          model: db.PurchaseDetail,
          as: "detalles",
          include: [
            {
              model: db.Product,
              as: "producto",
              attributes: ["nombre", "marca"],
            },
          ],
        },
        { model: db.Supplier, as: "proveedor", attributes: ["nombre_empresa"] },
      ],
      order: [["idCompra", "DESC"]],
    });
    res.json({ ok: true, data: purchases });
  } catch (error) {
    console.error("❌ Error en getAllPurchases:", error);
    res.status(500).json({ ok: false, error: error.message });
  }
};

/**
 * 4. CONSULTAR COMPRA POR ID
 */
const getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await db.Purchase.findByPk(id, {
      include: [
        {
          model: db.PurchaseDetail,
          as: "detalles",
          include: [{ model: db.Product, as: "producto" }],
        },
        {
          model: db.Supplier,
          as: "proveedor",
          attributes: ["nombre_empresa", "contacto"],
        },
        {
          model: db.Empleado,
          as: "empleado",
          attributes: ["nombre", "apellido"],
        },
      ],
    });

    if (!purchase)
      return res.status(404).json({ ok: false, msg: "Compra inexistente." });

    res.json({ ok: true, data: purchase });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
};

// FIX: nombres corregidos — apuntan a las funciones reales definidas arriba
const shoppingController = {
  createPurchase,
  confirmReceipt,
  getAllPurchases,
  getPurchaseById,
};

export default shoppingController;
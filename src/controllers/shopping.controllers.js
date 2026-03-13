import db from "../models/index.model.js";

// Estados válidos como constante única (fuente de verdad)
const ESTADOS_VALIDOS = {
  SOLICITADO: "Solicitado",
  RECIBIDO: "Recibido",
  COMPLETADA: "Completada",
};

/**
 * 1. REGISTRAR PEDIDO
 * El stock NO se toca aquí. El trigger `tg_sumar_stock_compra`
 * en la BD es el responsable, y fue corregido para verificar
 * el estado antes de sumar.
 */
const createPurchase = async (req, res) => {
  const t = await db.sequelize.transaction();

  try {
    const { id_proveedor, id_empleado, total, productos, estado_compra } =
      req.body;

    if (!productos || productos.length === 0) {
      await t.rollback();
      return res
        .status(400)
        .json({ ok: false, msg: "La compra debe tener al menos un producto." });
    }

    // Normalización estricta
    const inputEstado = estado_compra
      ? estado_compra.toString().trim().toLowerCase()
      : "solicitado";

    const estadoParaDB =
      inputEstado.charAt(0).toUpperCase() + inputEstado.slice(1);

    // Validar que el estado sea uno de los permitidos
    if (!Object.values(ESTADOS_VALIDOS).includes(estadoParaDB)) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        msg: `Estado inválido: "${estado_compra}". Use: ${Object.values(ESTADOS_VALIDOS).join(", ")}`,
      });
    }

    const esSolicitado = estadoParaDB === ESTADOS_VALIDOS.SOLICITADO;

    // A. Crear Cabecera
    const nuevaCompra = await db.Purchase.create(
      { id_proveedor, id_empleado, estado_compra: estadoParaDB, total },
      { transaction: t },
    );

    // B. Crear Detalle
    // NOTA: El trigger `tg_sumar_stock_compra` se dispara aquí (AFTER INSERT).
    // Fue corregido para verificar el estado de la compra antes de sumar stock.
    const detallesData = productos.map((item) => ({
      id_compra: nuevaCompra.id_compra,
      id_producto: item.id_producto,
      cantidad: item.cantidad,
      costo_unitario: item.costo_unitario,
      subtotal: item.cantidad * item.costo_unitario,
    }));

    await db.PurchaseDetail.bulkCreate(detallesData, { transaction: t });

    // C. ❌ ELIMINADO: El incremento manual de stock fue removido.
    // El trigger en BD lo maneja según el estado. No tocar stock aquí
    // evita la doble suma que causaba el bug.

    await t.commit();

    res.status(201).json({
      ok: true,
      msg: esSolicitado
        ? "Pedido registrado como SOLICITADO. Stock NO modificado."
        : "Compra registrada y stock actualizado.",
      id_compra: nuevaCompra.id_compra,
      estado_registrado: estadoParaDB,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error al crear compra:", error);
    res.status(500).json({
      ok: false,
      msg: "Error al procesar el pedido.",
      error: error.message,
    });
  }
};

/**
 * 2. CONFIRMAR RECEPCIÓN
 * Solo puede confirmar pedidos en estado "Solicitado".
 * El stock se incrementa manualmente aquí porque el trigger
 * solo actúa en INSERT, no en UPDATE de estado.
 */
const confirmReceipt = async (req, res) => {
  const { id } = req.params;
  const t = await db.sequelize.transaction();

  try {
    const compra = await db.Purchase.findByPk(id, {
      include: [{ model: db.PurchaseDetail, as: "detalles" }],
    });

    if (!compra) {
      await t.rollback();
      return res.status(404).json({ ok: false, msg: "Pedido no encontrado." });
    }

    // Solo "Solicitado" puede confirmarse — previene doble incremento
    if (compra.estado_compra !== ESTADOS_VALIDOS.SOLICITADO) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        msg: `No se puede confirmar. El pedido ya está en estado: "${compra.estado_compra}". Solo los pedidos "Solicitado" pueden confirmarse.`,
      });
    }

    if (!compra.detalles || compra.detalles.length === 0) {
      await t.rollback();
      return res.status(400).json({
        ok: false,
        msg: "El pedido no tiene detalles registrados.",
      });
    }

    // Actualizar estado a Recibido
    await compra.update(
      { estado_compra: ESTADOS_VALIDOS.RECIBIDO },
      { transaction: t },
    );

    // Incrementar stock manualmente (el trigger no actúa en UPDATE)
    const updatePromises = compra.detalles.map((item) =>
      db.Product.increment("stock_buen_estado", {
        by: item.cantidad,
        where: { id_producto: item.id_producto },
        transaction: t,
      }),
    );

    await Promise.all(updatePromises);
    await t.commit();

    res.json({
      ok: true,
      msg: "Recepción confirmada. Stock incrementado correctamente.",
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ ok: false, error: error.message });
  }
};

/**
 * 3. CONSULTAR TODOS LOS PEDIDOS
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
      order: [["id_compra", "DESC"]],
    });
    res.json({ ok: true, data: purchases });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al listar pedidos.",
      error: error.message,
    });
  }
};

/**
 * 4. CONSULTAR PEDIDO POR ID
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
      return res.status(404).json({ ok: false, msg: "El pedido no existe." });

    res.json({ ok: true, data: purchase });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al consultar el detalle.",
      error: error.message,
    });
  }
};

export const shoppingController = {
  createPurchase,
  confirmReceipt,
  getAllPurchases,
  getPurchaseById,
};

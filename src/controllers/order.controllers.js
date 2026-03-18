import db from "../models/index.model.js";

const orderController = {};

/**
 * ESTADOS DEFINIDOS:
 * 1 = Cotización (No resta stock)
 * 2 = Separación (Resta stock)
 */

// 1. OBTENER TODOS LOS PEDIDOS
orderController.getAllOrders = async (req, res) => {
  try {
    const pedidos = await db.Order.findAll({
      include: [
        { model: db.Customer, as: "cliente" },
        {
          model: db.OrderDetail,
          as: "detalles",
          include: [{ model: db.Product, as: "producto" }],
        },
      ],
      order: [["id_pedido", "DESC"]],
    });
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. CREAR PEDIDO O COTIZACIÓN
orderController.createOrder = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const {
      id_cliente,
      id_vendedor,
      id_origen_pedido,
      tipo_pago,
      id_estado_pedido,
      detalles,
    } = req.body;

    if (!detalles || !Array.isArray(detalles) || detalles.length === 0) {
      throw new Error("El pedido debe contener al menos un producto.");
    }

    const estadoActual = id_estado_pedido || 1;

    const nuevoPedido = await db.Order.create(
      {
        id_cliente,
        id_vendedor,
        id_origen_pedido,
        tipo_pago,
        id_estado_pedido: estadoActual,
        total_neto: 0,
      },
      { transaction: t }
    );

    let acumuladoTotal = 0;

    for (const item of detalles) {
      const producto = await db.Product.findByPk(item.id_producto, {
        transaction: t,
      });

      if (!producto)
        throw new Error(`El repuesto ID ${item.id_producto} no existe.`);

      if (Number(estadoActual) === 2) {
        if (producto.stock_buen_estado < item.cantidad_solicitada) {
          throw new Error(
            `Stock insuficiente para ${producto.nombre}. Disponible: ${producto.stock_buen_estado}`
          );
        }
        await producto.update(
          {
            stock_buen_estado:
              producto.stock_buen_estado - item.cantidad_solicitada,
          },
          { transaction: t }
        );
      }

      const subtotal = item.cantidad_solicitada * item.precio_venta;
      acumuladoTotal += subtotal;

      await db.OrderDetail.create(
        {
          id_pedido: nuevoPedido.id_pedido,
          id_producto: item.id_producto,
          cantidad_solicitada: item.cantidad_solicitada,
          precio_venta: item.precio_venta,
          descuento_aplicado: item.descuento_aplicado || 0,
          subtotal_linea: subtotal,
        },
        { transaction: t }
      );
    }

    await nuevoPedido.update({ total_neto: acumuladoTotal }, { transaction: t });
    await t.commit();

    res.status(201).json({
      success: true,
      message:
        estadoActual === 1
          ? "Cotización creada con éxito"
          : "Pedido separado con éxito",
      id_pedido: nuevoPedido.id_pedido,
      total: acumuladoTotal,
    });
  } catch (error) {
    if (t) await t.rollback();
    res.status(400).json({ success: false, message: error.message });
  }
};

// 3. CONFIRMAR SEPARACIÓN (Pasar de 1 a 2)
orderController.confirmSeparation = async (req, res) => {
  const { id } = req.params;
  const t = await db.sequelize.transaction();
  try {
    const pedido = await db.Order.findByPk(id, {
      include: [{ model: db.OrderDetail, as: "detalles" }],
      transaction: t,
    });

    if (!pedido) throw new Error("Pedido no encontrado.");
    if (Number(pedido.id_estado_pedido) !== 1) {
      throw new Error(
        "Solo se pueden separar pedidos que estén en estado de Cotización."
      );
    }

    for (const detalle of pedido.detalles) {
      const producto = await db.Product.findByPk(detalle.id_producto, {
        transaction: t,
      });

      if (producto.stock_buen_estado < detalle.cantidad_solicitada) {
        throw new Error(
          `Stock insuficiente para confirmar el repuesto: ${producto.nombre}`
        );
      }

      await producto.update(
        {
          stock_buen_estado:
            producto.stock_buen_estado - detalle.cantidad_solicitada,
        },
        { transaction: t }
      );
    }

    await pedido.update({ id_estado_pedido: 2 }, { transaction: t });
    await t.commit();

    res.json({
      success: true,
      message: "Pedido confirmado y stock descontado correctamente.",
    });
  } catch (error) {
    if (t) await t.rollback();
    res.status(400).json({ success: false, message: error.message });
  }
};

// 4. OBTENER POR ID
orderController.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const pedido = await db.Order.findByPk(id, {
      include: [
        {
          model: db.OrderDetail,
          as: "detalles",
          include: [{ model: db.Product, as: "producto" }],
        },
        { model: db.Customer, as: "cliente" },
      ],
    });

    if (!pedido)
      return res.status(404).json({ message: "Pedido no encontrado" });
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// FIX: 'export { orderController }' → 'export default orderController'
export default orderController;
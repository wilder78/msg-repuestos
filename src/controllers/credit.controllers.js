import db from "../models/index.model.js";
const { Credit, Customer } = db;

const creditController = {
  // 1. Obtener todos los créditos con información del cliente
  getAllCredits: async (req, res) => {
    try {
      const credits = await Credit.findAll({
        include: [
          {
            model: Customer,
            as: "cliente",
            // IMPORTANTE: Se cambió 'nombre_cliente' por 'razonSocial' y 'idCliente'
            attributes: ["idCliente", "numeroDocumento", "razonSocial"],
          },
        ],
      });
      res.json(credits);
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 2. Crear o asignar un crédito a un cliente
  createCredit: async (req, res) => {
    try {
      const { idCliente, cupoAprobado } = req.body;

      // Validar si el cliente ya tiene un crédito asignado
      const existe = await Credit.findOne({ where: { idCliente } });
      if (existe) {
        return res.status(400).json({
          ok: false,
          message: "Este cliente ya tiene una línea de crédito activa.",
        });
      }

      // El disponible inicial es igual al aprobado
      const nuevoCredito = await Credit.create({
        idCliente,
        cupoAprobado,
        cupoDisponible: cupoAprobado,
        cupoUtilizado: 0,
        idEstadoCredito: 1, // Activo por defecto
      });

      res.status(201).json({ ok: true, credit: nuevoCredito });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 3. Actualizar uso de crédito (Ej: Al registrar una venta)
  updateCreditLimit: async (req, res) => {
    try {
      const { id } = req.params;
      const { cupoUtilizado } = req.body;

      const credito = await Credit.findByPk(id);
      if (!credito) {
        return res
          .status(404)
          .json({ ok: false, message: "Crédito no encontrado" });
      }

      // Lógica de Negocio: Calcular nuevo disponible
      const nuevoDisponible =
        parseFloat(credito.cupoAprobado) - parseFloat(cupoUtilizado);

      // Validación opcional: ¿Puede quedar en negativo?
      // Si no permites sobregiro, descomenta esto:

      if (nuevoDisponible < 0) {
        return res
          .status(400)
          .json({
            ok: false,
            message: "Cupo insuficiente para esta transacción",
          });
      }

      await credito.update({
        cupoUtilizado,
        cupoDisponible: nuevoDisponible,
      });

      res.json({
        ok: true,
        message: "Cupo actualizado correctamente",
        data: {
          aprobado: credito.cupoAprobado,
          utilizado: cupoUtilizado,
          disponible: nuevoDisponible,
        },
      });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },
};

export default creditController;

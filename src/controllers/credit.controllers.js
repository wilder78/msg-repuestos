import db from "../models/index.model.js";
const { Credit, Customer } = db;

const creditController = {
  // 1. Consulta global de cartera: Recupera el listado de créditos integrando datos identificativos del cliente mediante un JOIN.
  getAllCredits: async (req, res) => {
    try {
      const credits = await Credit.findAll({
        include: [
          {
            model: Customer,
            as: "cliente",
            attributes: ["idCliente", "numeroDocumento", "razonSocial"],
          },
        ],
      });
      res.json(credits);
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 2. Apertura de línea crediticia: Valida la preexistencia de cuenta y establece los límites financieros iniciales para un cliente específico.
  createCredit: async (req, res) => {
    try {
      const { idCliente, cupoAprobado } = req.body;

      const existe = await Credit.findOne({ where: { idCliente } });
      if (existe) {
        return res.status(400).json({
          ok: false,
          message: "Este cliente ya tiene una línea de crédito activa.",
        });
      }

      const nuevoCredito = await Credit.create({
        idCliente,
        cupoAprobado,
        cupoDisponible: cupoAprobado,
        cupoUtilizado: 0,
        idEstadoCredito: 1, 
      });

      res.status(201).json({ ok: true, credit: nuevoCredito });
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 3. Gestión de cupos y saldos: Recalcula el balance financiero disponible basándose en el consumo actual y previene el sobregiro comercial.
  updateCreditLimit: async (req, res) => {
    try {
      const { id } = req.params;
      const { cupoUtilizado } = req.body;

      const credito = await Credit.findByPk(id);
      if (!credito) {
        return res.status(404).json({ ok: false, message: "Crédito no encontrado" });
      }

      const nuevoDisponible = parseFloat(credito.cupoAprobado) - parseFloat(cupoUtilizado);

      if (nuevoDisponible < 0) {
        return res.status(400).json({
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
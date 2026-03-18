import db from "../models/index.model.js";

const { Ruta, RutaDetail, Empleado, Zona, Customer } = db;

const rutaController = {
  // 1. Crear una nueva ruta con sus paradas detalladas
  createRuta: async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      const { nombreRuta, idZona, idEmpleado, fechaPlanificada, detalles } = req.body;

      const nuevaRuta = await Ruta.create(
        {
          nombreRuta,
          idZona,
          idEmpleado,
          fechaPlanificada,
          idEstadoRuta: 1, // 1 = Planificada
        },
        { transaction: t }
      );

      if (detalles && detalles.length > 0) {
        const paradasFormateadas = detalles.map((p, index) => ({
          idRuta: nuevaRuta.idRuta,
          secuenciaParada: index + 1,
          idCliente: p.idCliente,
          idPedido: p.idPedido || null,
          estadoVisita: "Pendiente",
        }));

        await RutaDetail.bulkCreate(paradasFormateadas, { transaction: t });
      }

      await t.commit();
      return res.status(201).json({
        ok: true,
        message: "Ruta y detalles creados exitosamente",
        idRuta: nuevaRuta.idRuta,
      });
    } catch (error) {
      if (!t.finished) await t.rollback();
      return res.status(500).json({
        ok: false,
        message: "Error al procesar la ruta",
        error: error.message,
      });
    }
  },

  // 2. Obtener listado general de rutas (Optimizado para evitar duplicidad SQL)
  getAllRutas: async (req, res) => {
    try {
      const rutas = await Ruta.findAll({
        attributes: [
          "idRuta",
          "nombreRuta",
          "idZona",
          "idEmpleado",
          "fechaPlanificada",
          "idEstadoRuta",
          "fechaEjecucionInicio",
          "fechaEjecucionFin",
        ],
        include: [
          {
            model: Empleado,
            as: "empleado",
            attributes: ["nombre", "apellido"],
          },
          {
            model: Zona,
            as: "zona",
            attributes: ["nombreZona"],
          },
        ],
        order: [["idRuta", "DESC"]],
      });
      return res.json(rutas);
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 3. Obtener detalle profundo de una ruta específica
  getRutaById: async (req, res) => {
    try {
      const { id } = req.params;
      const ruta = await Ruta.findByPk(id, {
        attributes: [
          "idRuta",
          "nombreRuta",
          "idZona",
          "idEmpleado",
          "fechaPlanificada",
          "idEstadoRuta",
        ],
        include: [
          {
            model: RutaDetail,
            as: "detalles",
            attributes: [
              "idDetalleRuta",
              "secuenciaParada",
              "idCliente",
              "idPedido",
              "estadoVisita",
              "fechaLlegadaReal",
              "fechaSalidaReal",
            ],
            include: [
              {
                model: Customer,
                as: "cliente",
                attributes: ["nombre", "apellido", "direccion", "telefono"],
              },
            ],
          },
          {
            model: Empleado,
            as: "empleado",
            attributes: ["nombre", "apellido"],
          },
          {
            model: Zona,
            as: "zona",
            attributes: ["nombreZona"],
          },
        ],
      });

      if (!ruta) return res.status(404).json({ message: "La ruta no existe" });

      return res.json(ruta);
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 4. Actualizar el estado de una visita específica (Logística en tiempo real)
  updateVisita: async (req, res) => {
    try {
      const { idDetalleRuta } = req.params;
      const { estadoVisita, fechaLlegadaReal, fechaSalidaReal } = req.body;

      const [updated] = await RutaDetail.update(
        {
          estadoVisita,
          fechaLlegadaReal,
          fechaSalidaReal,
        },
        { where: { idDetalleRuta } }
      );

      if (updated) {
        return res.json({ message: "Visita actualizada correctamente" });
      } else {
        return res.status(404).json({ message: "Detalle de ruta no encontrado" });
      }
    } catch (error) {
      return res.status(500).json({ ok: false, message: error.message });
    }
  },
};

export default rutaController;
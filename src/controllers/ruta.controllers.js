import db from "../models/index.model.js";

const { Ruta, RutaDetail, Empleado, Zona, Customer } = db;

const rutaController = {
  // 1. CREAR RUTA CON DETALLES
  createRuta: async (req, res) => {
    const t = await db.sequelize.transaction();
    try {
      const { nombreRuta, idZona, idEmpleado, fechaPlanificada, detalles } =
        req.body;

      const nuevaRuta = await Ruta.create(
        {
          nombreRuta,
          idZona,
          idEmpleado,
          fechaPlanificada,
          idEstadoRuta: 1,
        },
        { transaction: t },
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
      res.status(201).json({
        ok: true,
        message: "Ruta y detalles creados exitosamente",
        idRuta: nuevaRuta.idRuta,
      });
    } catch (error) {
      await t.rollback();
      res.status(500).json({
        ok: false,
        message: "Error al procesar la ruta",
        error: error.message,
      });
    }
  },

  // 2. OBTENER TODAS LAS RUTAS (Limpio de duplicados SQL)
  getAllRutas: async (req, res) => {
    try {
      const rutas = await Ruta.findAll({
        // Seleccionamos solo los alias de JS para evitar id_zona, id_empleado, etc.
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
      res.json(rutas);
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 3. OBTENER DETALLE ESPECÍFICO (Con limpieza profunda de JSON)
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

      res.json(ruta);
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },

  // 4. ACTUALIZAR ESTADO DE LA VISITA
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
        { where: { idDetalleRuta } },
      );

      if (updated) {
        res.json({ message: "Visita actualizada correctamente" });
      } else {
        res.status(404).json({ message: "Detalle de ruta no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  },
};

export default rutaController;

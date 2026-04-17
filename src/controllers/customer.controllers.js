import { response } from "express";
import db from "../models/index.model.js";

const customerController = {
  // 1. Obtener todos los clientes
  getAllCustomers: async (req, res = response) => {
    try {
      const customers = await db.Customer.findAll({
        attributes: [
          "idCliente",
          "idTipoDocumento",
          "numeroDocumento",
          "razonSocial",
          "personaContacto", // Confirmado
          "direccion",
          "telefono",
          "email",
          "tipoCliente",
          "cupoCredito",
          "idEstado", // Antes 'activo'
          "idZona",
          "fechaRegistro", // Confirmado
        ],
        include: [
          {
            model: db.TipoDocumento,
            as: "tipoDocumento",
            attributes: ["sigla", "descripcion"],
          },
        ],
        order: [["idCliente", "ASC"]],
      });

      return res.status(200).json(customers);
    } catch (error) {
      console.error("❌ Error al obtener clientes:", error);
      return res.status(500).json({
        ok: false,
        message: "Error interno al obtener la lista de clientes",
        error: process.env.NODE_ENV === "development" ? error.message : {},
      });
    }
  },

  // 2. Obtener un cliente por ID
  getCustomerById: async (req, res = response) => {
    const { id } = req.params;
    try {
      const customer = await db.Customer.findByPk(id, {
        include: [{ model: db.TipoDocumento, as: "tipoDocumento" }],
      });

      if (!customer) {
        return res.status(404).json({
          status: "error",
          message: `Cliente con ID ${id} no encontrado`,
        });
      }
      return res.json(customer);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al obtener el cliente",
        error: error.message,
      });
    }
  },

  // 3. Crear un nuevo cliente
  createCustomer: async (req, res = response) => {
    try {
      console.log("📥 Datos recibidos para creación:", req.body);

      const { razonSocial, idTipoDocumento, numeroDocumento } = req.body;

      // Validaciones críticas
      if (!razonSocial || !idTipoDocumento || !numeroDocumento) {
        return res.status(400).json({
          status: "error",
          message:
            "Faltan campos obligatorios: Razón Social, Tipo o Número de documento.",
        });
      }

      // Preparación de data con defaults del modelo
      const clienteData = {
        ...req.body,
        idEstado: req.body.idEstado || 1,
        idZona: req.body.idZona || 1,
        tipoCliente: req.body.tipoCliente || "General",
        cupoCredito: parseFloat(req.body.cupoCredito) || 0.0,
        // Si viene fechaRegistro desde una migración se usa, sino Sequelize usa NOW()
      };

      const newCustomer = await db.Customer.create(clienteData);

      return res.status(201).json({
        status: "success",
        message: "Cliente creado con éxito",
        data: newCustomer,
      });
    } catch (error) {
      console.error("❌ Error al crear cliente:", error);

      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        return res.status(400).json({
          status: "error",
          message: "Error de validación en los datos enviados.",
          error: error.errors.map((e) => e.message).join(", "),
        });
      }

      return res.status(500).json({
        status: "error",
        message: "Error interno del servidor al crear el cliente.",
        error: error.message,
      });
    }
  },

  // 4. Actualizar cliente
  updateCustomer: async (req, res = response) => {
    const { id } = req.params;
    try {
      // Extraemos idCliente para evitar que intenten cambiar la PK
      const { idCliente, fechaRegistro, ...dataToUpdate } = req.body;

      const [updatedRows] = await db.Customer.update(dataToUpdate, {
        where: { idCliente: id },
      });

      if (updatedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "Cliente no encontrado o no se realizaron cambios.",
        });
      }

      const updatedCustomer = await db.Customer.findByPk(id);
      return res.json({
        status: "success",
        message: "Cliente actualizado con éxito",
        data: updatedCustomer,
      });
    } catch (error) {
      console.error("❌ Error al actualizar cliente:", error);
      return res.status(500).json({
        status: "error",
        message: "Error al actualizar el registro.",
        error: error.message,
      });
    }
  },

  // 5. Eliminar cliente (Borrado Físico Permanente)
  deleteCustomer: async (req, res = response) => {
    const { id } = req.params;
    try {
      if (!id || isNaN(id)) {
        return res.status(400).json({
          status: "error",
          message: "El ID proporcionado no es válido.",
        });
      }

      const rowsDeleted = await db.Customer.destroy({
        where: { idCliente: id },
      });

      if (rowsDeleted === 0) {
        return res.status(404).json({
          status: "error",
          message: `No se encontró el cliente con ID ${id}.`,
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Cliente eliminado permanentemente.",
      });
    } catch (error) {
      // 1. Manejo específico para historial (No se muestra en consola)
      if (error.name === "SequelizeForeignKeyConstraintError") {
        return res.status(409).json({
          status: "warning", // Cambiado a warning para diferenciarlo de un error técnico
          message:
            "No se puede eliminar el cliente porque tiene historial (ventas o facturas).",
        });
      }

      // 2. Errores inesperados (Estos sí se imprimen para debug)
      console.error("❌ Error crítico en deleteCustomer:", error.message);
      return res.status(500).json({
        status: "error",
        message: "Error interno al intentar eliminar el registro.",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Internal Server Error",
      });
    }
  },
};

export default customerController;

// import { response } from "express";
// import db from "../models/index.model.js";

// const customerController = {
//   // 1. Obtener todos los clientes
//   getAllCustomers: async (req, res = response) => {
//     try {
//       const customers = await db.Customer.findAll({
//         attributes: [
//           "idCliente",
//           "idTipoDocumento",
//           "numeroDocumento",
//           "razonSocial",
//           "direccion",
//           "telefono",
//           "email",
//           "tipoCliente",
//           "cupoCredito",
//           "activo",
//           "idZona",
//         ],
//         include: [
//           {
//             model: db.TipoDocumento,
//             as: "tipoDocumento",
//             attributes: ["sigla", "descripcion"],
//           },
//         ],
//         order: [["idCliente", "ASC"]],
//       });

//       // Retornamos directamente el array para que el frontend lo procese sin problemas
//       return res.status(200).json(customers);
//     } catch (error) {
//       console.error("Error al obtener clientes:", error);

//       // Enviamos un objeto de error estructurado
//       return res.status(500).json({
//         ok: false,
//         message: "Error interno del servidor al obtener la lista de clientes",
//         error: process.env.NODE_ENV === "development" ? error.message : {},
//       });
//     }
//   },

//   // 2. Obtener un cliente por ID
//   getCustomerById: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       const customer = await db.Customer.findByPk(id, {
//         include: [{ model: db.TipoDocumento, as: "tipoDocumento" }],
//       });

//       if (!customer) {
//         return res.status(404).json({
//           status: "error",
//           message: `Cliente con ID ${id} no encontrado`,
//         });
//       }
//       return res.json(customer);
//     } catch (error) {
//       return res.status(500).json({
//         status: "error",
//         message: "Error al obtener el cliente",
//         error: error.message,
//       });
//     }
//   },

//   // 3. Crear un nuevo cliente
//   createCustomer: async (req, res = response) => {
//     try {
//       if (!req.body.razonSocial) {
//         return res.status(400).json({
//           status: "error",
//           message: "La razón social es obligatoria.",
//         });
//       }

//       const newCustomer = await db.Customer.create(req.body);

//       return res.status(201).json({
//         status: "success",
//         message: "Cliente creado con éxito",
//         data: newCustomer,
//       });
//     } catch (error) {
//       const errorMsg =
//         error.name === "SequelizeValidationError"
//           ? error.errors.map((e) => e.message).join(", ")
//           : error.message;

//       return res.status(400).json({
//         status: "error",
//         message: "No se pudo crear el cliente.",
//         error: errorMsg,
//       });
//     }
//   },

//   // 4. Actualizar cliente
//   updateCustomer: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       const { idCliente, ...dataToUpdate } = req.body;

//       const [updatedRows] = await db.Customer.update(dataToUpdate, {
//         where: { idCliente: id },
//       });

//       if (updatedRows === 0) {
//         return res.status(404).json({
//           status: "error",
//           message: "Cliente no encontrado o sin cambios aplicados.",
//         });
//       }

//       const updatedCustomer = await db.Customer.findByPk(id);
//       return res.json({
//         status: "success",
//         message: "Cliente actualizado con éxito",
//         data: updatedCustomer,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         status: "error",
//         message: "Error al actualizar el cliente",
//         error: error.message,
//       });
//     }
//   },

//   // 5. Desactivar cliente (Soft Delete)
//   deleteCustomer: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       const [result] = await db.Customer.update(
//         { activo: 0 },
//         { where: { idCliente: id } },
//       );

//       if (result === 0) {
//         return res.status(404).json({
//           status: "error",
//           message: "No se encontró el cliente para desactivar.",
//         });
//       }

//       return res.json({
//         status: "success",
//         message: "Cliente desactivado correctamente",
//       });
//     } catch (error) {
//       return res.status(500).json({
//         status: "error",
//         message: "Error al desactivar el cliente",
//         error: error.message,
//       });
//     }
//   },
// };

// export default customerController;

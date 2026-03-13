import { response } from "express";
import db from "../models/index.model.js";

const customerController = {
  // 1. Obtener todos los clientes
  getAllCustomers: async (req, res = response) => {
    try {
      const customers = await db.Customer.findAll({
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
      return res.status(500).json({
        status: "error",
        message: "Error al obtener los clientes",
        error: error.message,
      });
    }
  },

  // 2. Obtener un cliente por ID (FALTABA ESTE MÉTODO)
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
      if (!req.body.razonSocial) {
        return res.status(400).json({
          status: "error",
          message: "La razón social es obligatoria.",
        });
      }

      const newCustomer = await db.Customer.create(req.body);

      return res.status(201).json({
        status: "success",
        message: "Cliente creado con éxito",
        data: newCustomer,
      });
    } catch (error) {
      const errorMsg =
        error.name === "SequelizeValidationError"
          ? error.errors.map((e) => e.message).join(", ")
          : error.message;

      return res.status(400).json({
        status: "error",
        message: "No se pudo crear el cliente.",
        error: errorMsg,
      });
    }
  },

  // 4. Actualizar cliente
  updateCustomer: async (req, res = response) => {
    const { id } = req.params;
    try {
      const { idCliente, ...dataToUpdate } = req.body;

      const [updatedRows] = await db.Customer.update(dataToUpdate, {
        where: { idCliente: id },
      });

      if (updatedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "Cliente no encontrado o sin cambios aplicados.",
        });
      }

      const updatedCustomer = await db.Customer.findByPk(id);
      return res.json({
        status: "success",
        message: "Cliente actualizado con éxito",
        data: updatedCustomer,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al actualizar el cliente",
        error: error.message,
      });
    }
  },

  // 5. Desactivar cliente (Soft Delete)
  deleteCustomer: async (req, res = response) => {
    const { id } = req.params;
    try {
      const [result] = await db.Customer.update(
        { activo: 0 },
        { where: { idCliente: id } }
      );

      if (result === 0) {
        return res.status(404).json({
          status: "error",
          message: "No se encontró el cliente para desactivar.",
        });
      }

      return res.json({
        status: "success",
        message: "Cliente desactivado correctamente",
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error al desactivar el cliente",
        error: error.message,
      });
    }
  },
};

// Asegúrate de que el nombre del archivo sea exactamente el que importas en las rutas
export default customerController;

// import { response } from "express";
// import db from "../models/index.model.js";

// const customerController = {
//   // 1. Obtener todos los clientes
//   getAllCustomers: async (req, res = response) => {
//     try {
//       if (!db.Customer) {
//         throw new Error("El modelo Customer no está inicializado.");
//       }

//       const customers = await db.Customer.findAll({
//         include: [
//           {
//             model: db.TipoDocumento,
//             as: "tipoDocumento",
//             attributes: ["sigla", "descripcion"],
//           },
//         ],
//         // Ordenamos por ID_Cliente (nombre exacto en el modelo)
//         order: [['ID_Cliente', 'ASC']]
//       });
//       return res.status(200).json(customers);
//     } catch (error) {
//       console.error("Error en getAllCustomers:", error);
//       return res.status(500).json({
//         status: "error",
//         message: "Error al obtener los clientes",
//         error: error.message
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
//           message: `Cliente con ID ${id} no encontrado`
//         });
//       }
//       return res.json(customer);
//     } catch (error) {
//       return res.status(500).json({
//         status: "error",
//         message: "Error al obtener el cliente",
//         error: error.message
//       });
//     }
//   },

//   // 3. Crear un nuevo cliente
//   createCustomer: async (req, res = response) => {
//     try {
//       // Validación: Verificamos que venga la Razón Social (nombre exacto)
//       if (!req.body.Razon_social) {
//         return res.status(400).json({
//           status: "error",
//           message: "La razón social es obligatoria."
//         });
//       }

//       // Sequelize mapeará automáticamente el JSON de Postman al modelo
//       const newCustomer = await db.Customer.create(req.body);

//       return res.status(201).json({
//         status: "success",
//         message: "Cliente creado con éxito",
//         data: newCustomer,
//       });
//     } catch (error) {
//       const errorMsg = error.name === 'SequelizeValidationError'
//         ? error.errors.map(e => e.message).join(", ")
//         : error.message;

//       return res.status(400).json({
//         status: "error",
//         message: "No se pudo crear el cliente.",
//         error: errorMsg
//       });
//     }
//   },

//   // 4. Actualizar cliente
//   updateCustomer: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       // Extraemos ID_Cliente para evitar que se intente sobrescribir la PK
//       const { ID_Cliente, ...dataToUpdate } = req.body;

//       const [updatedRows] = await db.Customer.update(dataToUpdate, {
//         where: { ID_Cliente: id },
//       });

//       if (updatedRows === 0) {
//         return res.status(404).json({
//           status: "error",
//           message: "Cliente no encontrado o sin cambios aplicados."
//         });
//       }

//       const updatedCustomer = await db.Customer.findByPk(id);
//       return res.json({
//         status: "success",
//         message: "Cliente actualizado con éxito",
//         data: updatedCustomer
//       });
//     } catch (error) {
//       return res.status(500).json({
//         status: "error",
//         message: "Error al actualizar el cliente",
//         error: error.message
//       });
//     }
//   },

//   // 5. Desactivar cliente (Soft Delete)
//   deleteCustomer: async (req, res = response) => {
//     const { id } = req.params;
//     try {
//       // Actualizamos el campo Activo a 0 (Inactivo)
//       const [result] = await db.Customer.update({ Activo: 0 }, {
//         where: { ID_Cliente: id }
//       });

//       if (result === 0) {
//         return res.status(404).json({
//           status: "error",
//           message: "No se encontró el cliente para desactivar."
//         });
//       }

//       return res.json({
//         status: "success",
//         message: "Cliente desactivado correctamente"
//       });
//     } catch (error) {
//       return res.status(500).json({
//         status: "error",
//         message: "Error al desactivar el cliente",
//         error: error.message
//       });
//     }
//   },
// };

// export default customerController;

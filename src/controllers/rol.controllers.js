import db from "../models/index.model.js";
const { Rol } = db;

// 1. Obtener todos los roles activos
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll({
      where: { idEstado: 1 },
    });
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener roles" });
  }
};

// 2. Crear un nuevo rol
export const createRol = async (req, res) => {
  try {
    const { nombreRol } = req.body;
    const newRol = await Rol.create({ nombreRol, idEstado: 1 });
    res.status(201).json({ message: "Rol creado", data: newRol });
  } catch (error) {
    res.status(500).json({ error: "Error al crear el rol" });
  }
};

// 3. MODIFICAR un rol (NUEVA FUNCIÓN)
export const updateRol = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreRol, idEstado } = req.body;

    const rol = await Rol.findByPk(id);

    if (!rol) {
      return res.status(404).json({ error: "Rol no encontrado" });
    }

    // Actualizamos solo los campos enviados
    await rol.update({
      nombreRol: nombreRol !== undefined ? nombreRol : rol.nombreRol,
      idEstado: idEstado !== undefined ? idEstado : rol.idEstado
    });

    res.status(200).json({ 
      message: "Rol actualizado exitosamente", 
      data: rol 
    });
  } catch (error) {
    console.error("❌ Error al actualizar rol:", error);
    res.status(500).json({ error: "Error interno al actualizar el rol" });
  }
};

// 4. Eliminar (Desactivar) un rol
export const deleteRol = async (req, res) => {
  try {
    const { id } = req.params;
    const rol = await Rol.findByPk(id);
    if (!rol) return res.status(404).json({ error: "Rol no encontrado" });

    await rol.update({ idEstado: 0 }); // Cambia a Inactivo
    res.status(200).json({ message: "Rol desactivado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el rol" });
  }
};



// import db from "../models/index.model.js";
// const { Rol } = db;

// // 1. Obtener todos los roles activos
// export const getAllRoles = async (req, res) => {
//   try {
//     const roles = await Rol.findAll({
//       where: { idEstado: 1 }, // Solo trae los activos
//     });
//     res.status(200).json(roles);
//   } catch (error) {
//     res.status(500).json({ error: "Error al obtener roles" });
//   }
// };

// // 2. Crear un nuevo rol
// export const createRol = async (req, res) => {
//   try {
//     const { nombreRol } = req.body;
//     const newRol = await Rol.create({ nombreRol, idEstado: 1 });
//     res.status(201).json({ message: "Rol creado", data: newRol });
//   } catch (error) {
//     res.status(500).json({ error: "Error al crear el rol" });
//   }
// };

// // 3. Eliminar (Desactivar) un rol
// export const deleteRol = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const rol = await Rol.findByPk(id);
//     if (!rol) return res.status(404).json({ error: "Rol no encontrado" });

//     await rol.update({ idEstado: 0 }); // Cambia a Inactivo
//     res.status(200).json({ message: "Rol desactivado correctamente" });
//   } catch (error) {
//     res.status(500).json({ error: "Error al eliminar el rol" });
//   }
// };

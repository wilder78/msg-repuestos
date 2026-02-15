import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.model.js";

const { Usuario } = db;

// 1. Crear usuario (Registro)
export const createUser = async (req, res) => {
  try {
    const { nombreUsuario, email, password, idEstado, idRol, idCliente } =
      req.body;

    if (!nombreUsuario || !email || !password) {
      return res.status(400).json({
        error: "Faltan campos obligatorios (nombreUsuario, email, password).",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Usuario.create({
      nombreUsuario,
      email: email.toLowerCase().trim(),
      passwordHash: hashedPassword,
      idEstado: idEstado ?? 1,
      idRol: idRol ?? 3,
      idCliente: idCliente ?? null,
    });

    const userResponse = newUser.toJSON();
    delete userResponse.passwordHash;

    return res.status(201).json({
      message: "Usuario creado exitosamente",
      data: userResponse,
    });
  } catch (error) {
    console.error("❌ Error al crear usuario:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        error: "El email o nombre de usuario ya está registrado.",
      });
    }

    return res.status(500).json({ error: "Error interno al crear usuario." });
  }
};

// 2. Login (Inicio de sesión por EMAIL)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña requeridos." });
    }

    // SIN INCLUDES - solo busca el usuario
    const user = await Usuario.findOne({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Credenciales incorrectas." });
    }

    const token = jwt.sign(
      {
        idUsuario: user.idUsuario,
        idRol: user.idRol, // Solo el ID
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "1h" },
    );

    return res.status(200).json({
      message: "¡Bienvenido a MSG Repuestos!",
      token,
      user: {
        id: user.idUsuario,
        nombre: user.nombreUsuario,
        email: user.email,
        idRol: user.idRol, // Solo el ID
        idEstado: user.idEstado, // Solo el ID
      },
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// 3. Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await Usuario.findAll({
      attributes: { exclude: ["passwordHash"] },
    });

    return res.status(200).json({
      message: "Usuarios obtenidos exitosamente",
      data: users,
    });
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// 4. Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Usuario.findByPk(id, {
      attributes: { exclude: ["passwordHash"] },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    return res.status(200).json({
      message: "Usuario encontrado",
      data: user,
    });
  } catch (error) {
    console.error("❌ Error al obtener usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// 5. Obtener usuario por EMAIL
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await Usuario.findOne({
      where: { email: email.toLowerCase().trim() },
      attributes: { exclude: ["passwordHash"] },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    return res.status(200).json({
      message: "Usuario encontrado",
      data: user,
    });
  } catch (error) {
    console.error("❌ Error al obtener usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// 6. Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const { nombreUsuario, email, password, idEstado, idRol } = req.body;

    const user = await Usuario.findByPk(idUsuario);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const updateData = {};

    if (nombreUsuario) updateData.nombreUsuario = nombreUsuario;
    if (email) updateData.email = email.toLowerCase().trim();
    if (idEstado) updateData.idEstado = idEstado;
    if (idRol) updateData.idRol = idRol;

    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    await user.update(updateData);

    const userResponse = user.toJSON();
    delete userResponse.passwordHash;

    return res.status(200).json({
      message: "Usuario actualizado exitosamente",
      data: userResponse,
    });
  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        error: "El email o nombre de usuario ya está en uso.",
      });
    }

    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// 7. Eliminar usuario (Soft delete - cambiar id_estado a 2)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Usuario.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Soft delete: cambiar estado a inactivo (2)
    await user.update({ idEstado: 2 });

    return res.status(200).json({
      message: "Usuario desactivado exitosamente",
    });
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import db from "../models/index.model.js";

// const { Usuario, Estado, Rol } = db;

// // 1. Crear usuario (Registro)
// export const createUser = async (req, res) => {
//   try {
//     const { nombreUsuario, email, password, idEstado, idRol, idCliente } =
//       req.body;

//     // Validación de campos requeridos
//     if (!nombreUsuario || !email || !password) {
//       return res.status(400).json({
//         error: "Faltan campos obligatorios (nombreUsuario, email, password).",
//       });
//     }

//     // Encriptación de contraseña
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await Usuario.create({
//       nombreUsuario,
//       email: email.toLowerCase().trim(),
//       passwordHash: hashedPassword,
//       idEstado: idEstado ?? 1,
//       idRol: idRol ?? 3,
//       idCliente: idCliente ?? null,
//     });

//     // Limpiamos la respuesta para no enviar el hash
//     const userResponse = newUser.toJSON();
//     delete userResponse.passwordHash;

//     return res.status(201).json({
//       message: "Usuario creado exitosamente",
//       data: userResponse,
//     });
//   } catch (error) {
//     console.error("❌ Error al crear usuario:", error);

//     if (error.name === "SequelizeUniqueConstraintError") {
//       return res.status(409).json({
//         error: "El email o nombre de usuario ya está registrado.",
//       });
//     }

//     return res.status(500).json({ error: "Error interno al crear usuario." });
//   }
// };

// // 2. Login (Inicio de sesión por EMAIL)
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ error: "Email y contraseña requeridos." });
//     }

//     const user = await Usuario.findOne({
//       where: { email: email.toLowerCase().trim() },
//       include: [
//         { model: Estado, as: "estado", attributes: ["nombre"] },
//         { model: Rol, as: "rol", attributes: ["nombreRol"] },
//       ],
//     });

//     if (!user) {
//       return res.status(401).json({ error: "Credenciales incorrectas." });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: "Credenciales incorrectas." });
//     }

//     const token = jwt.sign(
//       {
//         idUsuario: user.idUsuario,
//         rol: user.rol?.nombreRol,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRES || "1h" },
//     );

//     return res.status(200).json({
//       message: "¡Bienvenido a MSG Repuestos!",
//       token,
//       user: {
//         id: user.idUsuario,
//         nombre: user.nombreUsuario,
//         email: user.email,
//         rol: user.rol?.nombreRol,
//         estado: user.estado?.nombre,
//       },
//     });
//   } catch (error) {
//     console.error("❌ Error en login:", error);
//     return res.status(500).json({ error: "Error interno del servidor." });
//   }
// };

// // 3. Obtener todos los usuarios
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await Usuario.findAll({
//       attributes: { exclude: ["passwordHash"] }, // No enviamos el hash
//       include: [
//         { model: Estado, as: "estado", attributes: ["nombre"] },
//         { model: Rol, as: "rol", attributes: ["nombreRol"] },
//       ],
//     });

//     return res.status(200).json({
//       message: "Usuarios obtenidos exitosamente",
//       data: users,
//     });
//   } catch (error) {
//     console.error("❌ Error al obtener usuarios:", error);
//     return res.status(500).json({ error: "Error interno del servidor." });
//   }
// };

// // 4. Obtener usuario por ID
// export const getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await Usuario.findByPk(id, {
//       attributes: { exclude: ["passwordHash"] },
//       include: [
//         { model: Estado, as: "estado", attributes: ["nombre"] },
//         { model: Rol, as: "rol", attributes: ["nombreRol"] },
//       ],
//     });

//     if (!user) {
//       return res.status(404).json({ error: "Usuario no encontrado." });
//     }

//     return res.status(200).json({
//       message: "Usuario encontrado",
//       data: user,
//     });
//   } catch (error) {
//     console.error("❌ Error al obtener usuario:", error);
//     return res.status(500).json({ error: "Error interno del servidor." });
//   }
// };

// // 5. Obtener usuario por EMAIL
// export const getUserByEmail = async (req, res) => {
//   try {
//     const { email } = req.params;

//     const user = await Usuario.findOne({
//       where: { email: email.toLowerCase().trim() },
//       attributes: { exclude: ["passwordHash"] },
//       include: [
//         { model: Estado, as: "estado", attributes: ["nombre"] },
//         { model: Rol, as: "rol", attributes: ["nombreRol"] },
//       ],
//     });

//     if (!user) {
//       return res.status(404).json({ error: "Usuario no encontrado." });
//     }

//     return res.status(200).json({
//       message: "Usuario encontrado",
//       data: user,
//     });
//   } catch (error) {
//     console.error("❌ Error al obtener usuario:", error);
//     return res.status(500).json({ error: "Error interno del servidor." });
//   }
// };

// // 6. Actualizar usuario
// export const updateUser = async (req, res) => {
//   try {
//     const { idUsuario } = req.params;
//     const { nombreUsuario, email, password, idEstado, idRol } = req.body;

//     const user = await Usuario.findByPk(idUsuario);

//     if (!user) {
//       return res.status(404).json({ error: "Usuario no encontrado." });
//     }

//     // Preparamos los datos a actualizar
//     const updateData = {};

//     if (nombreUsuario) updateData.nombreUsuario = nombreUsuario;
//     if (email) updateData.email = email.toLowerCase().trim();
//     if (idEstado) updateData.idEstado = idEstado;
//     if (idRol) updateData.idRol = idRol;

//     // Si se proporciona una nueva contraseña, la encriptamos
//     if (password) {
//       updateData.passwordHash = await bcrypt.hash(password, 10);
//     }

//     await user.update(updateData);

//     // Respuesta sin el hash
//     const userResponse = user.toJSON();
//     delete userResponse.passwordHash;

//     return res.status(200).json({
//       message: "Usuario actualizado exitosamente",
//       data: userResponse,
//     });
//   } catch (error) {
//     console.error("❌ Error al actualizar usuario:", error);

//     if (error.name === "SequelizeUniqueConstraintError") {
//       return res.status(409).json({
//         error: "El email o nombre de usuario ya está en uso.",
//       });
//     }

//     return res.status(500).json({ error: "Error interno del servidor." });
//   }
// };

// // 7. Eliminar usuario (Soft delete recomendado)
// export const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await Usuario.findByPk(id);

//     if (!user) {
//       return res.status(404).json({ error: "Usuario no encontrado." });
//     }

//     // Soft delete: cambiar estado a "Inactivo" (idEstado = 2, ajusta según tu BD)
//     await user.update({ idEstado: 2 });

//     // Si prefieres borrado físico, usa: await user.destroy();

//     return res.status(200).json({
//       message: "Usuario desactivado exitosamente",
//     });
//   } catch (error) {
//     console.error("❌ Error al eliminar usuario:", error);
//     return res.status(500).json({ error: "Error interno del servidor." });
//   }
// };

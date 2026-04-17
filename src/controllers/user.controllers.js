import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.model.js";

const { Usuario } = db;

// Helper para limpiar campos sensibles del usuario
const sanitizeUser = (user) => {
  const { passwordHash, idRol, ...clean } = user.toJSON ? user.toJSON() : user;
  return clean;
};

// 1. Crear un nuevo usuario
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

    return res.status(201).json({
      message: "Usuario creado exitosamente",
      data: sanitizeUser(newUser),
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

// 2. Autenticación de usuario (Login)
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña requeridos." });
    }

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
      { idUsuario: user.idUsuario, idRol: user.idRol },
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
        idRol: user.idRol,
        idEstado: user.idEstado,
      },
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// 3. Obtener todos los usuarios registrados
export const getAllUsers = async (req, res) => {
  try {
    const users = await Usuario.findAll({
      attributes: { exclude: ["passwordHash"] },
    });

    return res.status(200).json({
      message: "Usuarios obtenidos exitosamente",
      data: users.map(sanitizeUser),
    });
  } catch (error) {
    console.error("❌ Error al obtener usuarios:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// 4. Obtener un usuario por su ID
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
      data: sanitizeUser(user),
    });
  } catch (error) {
    console.error("❌ Error al obtener usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// 5. Obtener un usuario por su correo electrónico
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
      data: sanitizeUser(user),
    });
  } catch (error) {
    console.error("❌ Error al obtener usuario:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

// 6. Actualizar información de un usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreUsuario, email, password, idEstado, idRol } = req.body;

    const user = await Usuario.findOne({ where: { idUsuario: id } });

    if (!user) {
      return res
        .status(404)
        .json({ error: `Usuario con ID ${id} no encontrado.` });
    }

    const updateData = {};
    if (nombreUsuario) updateData.nombreUsuario = nombreUsuario;
    if (email) updateData.email = email.toLowerCase().trim();
    if (idEstado) updateData.idEstado = idEstado;
    if (idRol) updateData.idRol = idRol;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.passwordHash = await bcrypt.hash(password, salt);
    }

    await user.update(updateData);

    return res.status(200).json({
      message: "Usuario actualizado exitosamente",
      data: sanitizeUser(user),
    });
  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ error: "El email o nombre de usuario ya está en uso." });
    }
    return res
      .status(500)
      .json({ error: "Error interno del servidor.", detail: error.message });
  }
};

// 7. Eliminar un usuario (Borrado físico, excepto Master)
export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Proteger al usuario Master por ID de parámetro
    if (id === 1) {
      return res
        .status(403)
        .json({ error: "El usuario Master no puede ser eliminado." });
    }

    const user = await Usuario.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Doble verificación con el registro real de la BD
    if (user.idUsuario === 1 || user.idRol === 1) {
      return res
        .status(403)
        .json({ error: "El usuario Master no puede ser eliminado." });
    }

    // Eliminación física del registro
    await user.destroy();

    return res.status(200).json({ message: "Usuario eliminado exitosamente." });
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);

    // Error de FK: el usuario tiene registros relacionados en otras tablas
    if (error.name === "SequelizeForeignKeyConstraintError") {
      return res.status(409).json({
        error:
          "No se puede eliminar el usuario porque tiene registros asociados en el sistema.",
      });
    }

    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

const userController = {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};

export default userController;

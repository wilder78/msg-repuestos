import db from "../models/index.model.js";
const TipoDocumento = db.TipoDocumento;

// Obtener todos
export const getAllTipos = async (req, res) => {
  try {
    const tipos = await TipoDocumento.findAll();
    res.status(200).json(tipos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tipos de documento" });
  }
};

// Crear uno nuevo
export const createTipo = async (req, res) => {
  try {
    const { sigla, descripcion } = req.body;
    const nuevo = await TipoDocumento.create({ sigla, descripcion });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el registro" });
  }
};

// Actualizar
export const updateTipo = async (req, res) => {
  try {
    const { id } = req.params;
    const { sigla, descripcion } = req.body;
    const registro = await TipoDocumento.findByPk(id);
    
    if (!registro) return res.status(404).json({ error: "No encontrado" });

    await registro.update({ sigla, descripcion });
    res.json({ message: "Actualizado correctamente", data: registro });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar" });
  }
};

// Eliminar
export const deleteTipo = async (req, res) => {
  try {
    const { id } = req.params;
    await TipoDocumento.destroy({ where: { idTipoDocumento: id } });
    res.json({ message: "Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar" });
  }
};
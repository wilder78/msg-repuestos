import db from "../models/index.model.js";
import colombia from "colombia-data-social";

const Department = db.Department;

/**
 * Obtener todos los departamentos desde la base de datos
 */
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({
      // Usamos el nombre de la propiedad en el modelo (name)
      // Sequelize se encarga de traducirlo a "nombre" en el SQL
      order: [["name", "ASC"]],
    });
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los departamentos",
      error: error.message,
    });
  }
};

/**
 * Sincronizar/Poblar departamentos desde la librería a la base de datos
 */
export const seedDepartments = async (req, res) => {
  try {
    const departmentsList = colombia.asTree();

    const departmentsData = departmentsList.map((item, index) => ({
      id: index + 1,
      name: item.departamento, // Mapea a la columna 'nombre' gracias al modelo
    }));

    // bulkCreate usará el mapeo definido en el modelo
    await Department.bulkCreate(departmentsData, {
      // Importante: Aquí usamos el nombre de la propiedad del modelo
      updateOnDuplicate: ["name"],
    });

    res.status(201).json({
      message: "Departamentos sincronizados exitosamente",
      count: departmentsData.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al sincronizar departamentos",
      error: error.message,
    });
  }
};

/**
 * Obtener un departamento por ID
 */
export const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findByPk(id);

    if (!department) {
      return res.status(404).json({ message: "Departamento no encontrado" });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el departamento",
      error: error.message,
    });
  }
};

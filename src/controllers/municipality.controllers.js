import db from "../models/index.model.js";
import colombia from "colombia-data-social";

const Municipality = db.Municipality;
const Department = db.Department;

/**
 * Obtener municipios filtrados por departamento
 * GET /api/municipalities/department/:departmentId
 */
export const getMunicipalitiesByDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const municipalities = await Municipality.findAll({
      // Sequelize usará el mapeo 'field: department_id' definido en el modelo
      where: { departmentId: departmentId },
      // Sequelize usará el mapeo 'field: nombre' definido en el modelo
      order: [["name", "ASC"]],
    });

    res.status(200).json(municipalities);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los municipios",
      error: error.message,
    });
  }
};

/**
 * Sincronizar/Poblar municipios desde la librería
 */
export const seedMunicipalities = async (req, res) => {
  try {
    const departmentsList = colombia.asTree();
    let allMunicipalities = [];
    let municipalityCounter = 1;

    // 1. Validamos que existan departamentos en la DB
    const dbDepartments = await Department.findAll();

    if (dbDepartments.length === 0) {
      return res.status(400).json({
        message: "Primero debes poblar la tabla de departamentos.",
      });
    }

    // 2. Procesamos la lista de la librería
    departmentsList.forEach((dept) => {
      // Buscamos coincidencia por el nombre del departamento
      const departmentFound = dbDepartments.find(
        (d) => d.name === dept.departamento,
      );

      if (departmentFound) {
        dept.ciudades.forEach((city) => {
          allMunicipalities.push({
            id: municipalityCounter++,
            name: city,
            departmentId: departmentFound.id,
          });
        });
      }
    });

    // 3. Inserción masiva usando los nombres de las propiedades del modelo
    await Municipality.bulkCreate(allMunicipalities, {
      // IMPORTANTE: Usamos los nombres de los atributos de JS, no de las columnas de SQL
      updateOnDuplicate: ["name", "departmentId"],
    });

    res.status(201).json({
      message: "Municipios sincronizados exitosamente",
      count: allMunicipalities.length,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al sincronizar municipios",
      error: error.message,
    });
  }
};

/**
 * Obtener todos los municipios con su departamento
 */
export const getAllMunicipalities = async (req, res) => {
  try {
    const municipalities = await Municipality.findAll({
      // Sequelize usará automáticamente los JOINs basados en las relaciones del modelo
      include: [
        {
          model: Department,
          as: "departamento",
        },
      ],
      order: [["name", "ASC"]],
    });
    res.status(200).json(municipalities);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la lista completa",
      error: error.message,
    });
  }
};

import db from "../models/index.model.js";
import colombia from "colombia-data-social";

const Municipality = db.Municipality;
const Department = db.Department;

const { departamentos } = colombia.data; // ✅ estructura correcta

/**
 * Obtener municipios filtrados por departamento
 * GET /api/municipalities/department/:departmentId
 */
export const getMunicipalitiesByDepartment = async (req, res) => {
  try {
    const { departmentId } = req.params;

    const municipalities = await Municipality.findAll({
      where: { departmentId: departmentId },
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
    // 1. Validamos que existan departamentos en la DB
    const dbDepartments = await Department.findAll();

    if (dbDepartments.length === 0) {
      return res.status(400).json({
        message: "Primero debes poblar la tabla de departamentos.",
      });
    }

    // 2. Procesamos usando la estructura correcta: data.departamentos
    let allMunicipalities = [];
    let municipalityCounter = 1;

    departamentos.forEach((dept) => {
      // Buscar por nombre (dept.nombre = "Antioquia")
      const departmentFound = dbDepartments.find(
        (d) => d.name.toLowerCase() === dept.nombre.toLowerCase(),
      );

      if (departmentFound) {
        // municipios es array de { codigo, nombre }
        dept.municipios.forEach((city) => {
          allMunicipalities.push({
            id: municipalityCounter++,
            name: city.nombre, // ✅ city.nombre no city directamente
            departmentId: departmentFound.id,
          });
        });
      }
    });

    // 3. Inserción masiva
    await Municipality.bulkCreate(allMunicipalities, {
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

import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/mysql.config.js";

// Importación de modelos
import UserModel from "./user.model.js";
import RolModel from "./rol.model.js";
import TipoDocumentoModel from "./tipo_documento.model.js"; // Nuevo modelo

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicialización de modelos
db.Usuario = UserModel(sequelize, DataTypes);
db.Rol = RolModel(sequelize, DataTypes);
db.TipoDocumento = TipoDocumentoModel(sequelize, DataTypes); // Inicialización del nuevo modelo

// Ejecutar asociaciones
// Este bloque recorre todos los modelos cargados en el objeto 'db' 
// y ejecuta la función 'associate' si existe en el archivo del modelo.
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;



// import { Sequelize, DataTypes } from "sequelize";
// import sequelize from "../config/mysql.config.js";

// // Importación de modelos
// import UserModel from "./user.model.js";
// import RolModel from "./rol.model.js"; // Asegúrate de que el archivo exista

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // Inicialización de modelos
// db.Usuario = UserModel(sequelize, DataTypes);
// db.Rol = RolModel(sequelize, DataTypes);

// // Ejecutar asociaciones
// // Esto es vital para que Usuario.belongsTo(Rol) funcione
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// export default db;

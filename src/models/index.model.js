import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/mysql.config.js";

// Importación de modelos
import UserModel from "./user.model.js";
import RolModel from "./rol.model.js"; // Asegúrate de que el archivo exista

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicialización de modelos
db.Usuario = UserModel(sequelize, DataTypes);
db.Rol = RolModel(sequelize, DataTypes);

// Ejecutar asociaciones
// Esto es vital para que Usuario.belongsTo(Rol) funcione
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;


// import { Sequelize, DataTypes } from "sequelize";
// import sequelize from "../config/mysql.config.js";

// // Solo importamos el modelo de Usuario
// import UserModel from "./user.model.js";

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // Inicializar solo el modelo Usuario
// db.Usuario = UserModel(sequelize, DataTypes);

// // Ejecutar asociaciones (aunque esté vacío)
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// export default db;

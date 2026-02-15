import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/mysql.config.js";

// Solo importamos el modelo de Usuario
import UserModel from "./user.model.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicializar solo el modelo Usuario
db.Usuario = UserModel(sequelize, DataTypes);

// Ejecutar asociaciones (aunque esté vacío)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;

// import { Sequelize, DataTypes } from 'sequelize';
// import sequelize from '../config/mysql.config.js';

// // Importación manual de modelos (más segura en ES Modules)
// import UserModel from './user.model.js';
// // Importa aquí tus otros modelos: Rol, Estado, Cliente, etc.

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // Inicializar modelos
// db.Usuario = UserModel(sequelize, DataTypes);
// // db.Rol = RolModel(sequelize, DataTypes); ...

// // Ejecutar asociaciones
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// export default db;

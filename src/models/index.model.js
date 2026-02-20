import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/mysql.config.js";

import UserModel from "./user.model.js";
import RolModel from "./rol.model.js";
import TipoDocumentoModel from "./document_type.model.js";
import EmployeeModel from "./employee.model.js";
import SupplierModel from "./supplier.model.js";
import ZonaModel from "./zona.model.js"; 

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usuario = UserModel(sequelize, DataTypes);
db.Rol = RolModel(sequelize, DataTypes);
db.TipoDocumento = TipoDocumentoModel(sequelize, DataTypes);
db.Empleado = EmployeeModel(sequelize, DataTypes);
db.Supplier = SupplierModel(sequelize, DataTypes); 
db.Zona = ZonaModel(sequelize, DataTypes); 

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
// import RolModel from "./rol.model.js";
// import TipoDocumentoModel from "./document_type.model.js";
// import EmployeeModel from "./employee.model.js";
// import SupplierModel from "./supplier.model.js";

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // 2. Inicialización de modelos
// db.Usuario = UserModel(sequelize, DataTypes);
// db.Rol = RolModel(sequelize, DataTypes);
// db.TipoDocumento = TipoDocumentoModel(sequelize, DataTypes);
// db.Empleado = EmployeeModel(sequelize, DataTypes);
// db.Supplier = SupplierModel(sequelize, DataTypes); 

// // 3. Ejecución de asociaciones
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// export default db;


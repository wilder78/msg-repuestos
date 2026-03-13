import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/mysql.config.js";

// Importación de Modelos existentes
import UserModel from "./user.model.js";
import RolModel from "./rol.model.js";
import TipoDocumentoModel from "./document_type.model.js";
import EmployeeModel from "./employee.model.js";
import SupplierModel from "./supplier.model.js";
import ZonaModel from "./zona.model.js";
import CustomerModel from "./customer.model.js";
import CategoryModel from "./category.model.js";
import ProductModel from "./product.model.js";

// 1. IMPORTACIÓN DE MODELOS DE COMPRAS
import PurchaseModel from "./shopping.model.js"; 
import PurchaseDetailModel from "./shopping_detail.model.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicialización de modelos
db.Usuario       = UserModel(sequelize, DataTypes);
db.Rol           = RolModel(sequelize, DataTypes);
db.TipoDocumento = TipoDocumentoModel(sequelize, DataTypes);
db.Empleado      = EmployeeModel(sequelize, DataTypes);
db.Supplier      = SupplierModel(sequelize, DataTypes);
db.Zona          = ZonaModel(sequelize, DataTypes);
db.Customer      = CustomerModel(sequelize, DataTypes);
db.Category      = CategoryModel(sequelize, DataTypes);
db.Product       = ProductModel(sequelize, DataTypes);

// 2. INICIALIZACIÓN DE COMPRAS Y DETALLES
db.Purchase       = PurchaseModel(sequelize, DataTypes);
db.PurchaseDetail = PurchaseDetailModel(sequelize, DataTypes);

// Configuración de Asociaciones
// Gracias a este bloque, las funciones .associate() de tus modelos se ejecutarán automáticamente
Object.keys(db).forEach((modelName) => {
  if (db[modelName] && db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;


// import { Sequelize, DataTypes } from "sequelize";
// import sequelize from "../config/mysql.config.js";

// // Importación de Modelos
// import UserModel from "./user.model.js";
// import RolModel from "./rol.model.js";
// import TipoDocumentoModel from "./document_type.model.js";
// import EmployeeModel from "./employee.model.js";
// import SupplierModel from "./supplier.model.js";
// import ZonaModel from "./zona.model.js";
// import CustomerModel from "./customer.model.js";
// import CategoryModel from "./category.model.js";
// import ProductModel from "./product.model.js"; // <--- 1. Importación de Productos

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // Inicialización de modelos
// // Los nombres a la izquierda (db.Nombre) son los que usarás en tus controladores
// db.Usuario       = UserModel(sequelize, DataTypes);
// db.Rol           = RolModel(sequelize, DataTypes);
// db.TipoDocumento = TipoDocumentoModel(sequelize, DataTypes);
// db.Empleado      = EmployeeModel(sequelize, DataTypes);
// db.Supplier      = SupplierModel(sequelize, DataTypes);
// db.Zona          = ZonaModel(sequelize, DataTypes);
// db.Customer      = CustomerModel(sequelize, DataTypes);
// db.Category      = CategoryModel(sequelize, DataTypes);
// db.Product       = ProductModel(sequelize, DataTypes); // <--- 2. Inicialización de Productos

// // Configuración de Asociaciones
// // Este bloque es vital para que Product.belongsTo(Category) funcione
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName] && db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// export default db;


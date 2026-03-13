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

// 2. IMPORTACIÓN DE MODELOS DE PEDIDOS
import OrderModel from "./order.model.js";
import OrderDetailModel from "./order_detail.model.js";

// 3. IMPORTACIÓN DE MODELO DE VENTAS (NUEVO - Vital para devoluciones)
import SaleModel from "./sale.model.js";

// 4. IMPORTACIÓN DE MODELOS DE DEVOLUCIONES
import ReturnModel from "./return.model.js";
import ReturnDetailModel from "./returnDetail.model.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Inicialización de modelos base
db.Usuario       = UserModel(sequelize, DataTypes);
db.Rol           = RolModel(sequelize, DataTypes);
db.TipoDocumento = TipoDocumentoModel(sequelize, DataTypes);
db.Empleado      = EmployeeModel(sequelize, DataTypes);
db.Supplier      = SupplierModel(sequelize, DataTypes);
db.Zona          = ZonaModel(sequelize, DataTypes);
db.Customer      = CustomerModel(sequelize, DataTypes);
db.Category      = CategoryModel(sequelize, DataTypes);
db.Product       = ProductModel(sequelize, DataTypes);

// INICIALIZACIÓN DE COMPRAS
db.Purchase       = PurchaseModel(sequelize, DataTypes);
db.PurchaseDetail = PurchaseDetailModel(sequelize, DataTypes);

// INICIALIZACIÓN DE PEDIDOS
db.Order          = OrderModel(sequelize, DataTypes);
db.OrderDetail    = OrderDetailModel(sequelize, DataTypes);

// INICIALIZACIÓN DE VENTAS (Añadido para resolver el error de FK)
db.Sale           = SaleModel(sequelize, DataTypes);

// INICIALIZACIÓN DE DEVOLUCIONES
db.CustomerReturn = ReturnModel(sequelize, DataTypes);
db.ReturnDetail   = ReturnDetailModel(sequelize, DataTypes);

// Configuración de Asociaciones
// Este bloque ejecuta la función associate() de cada modelo (incluyendo Sale y CustomerReturn)
Object.keys(db).forEach((modelName) => {
  if (db[modelName] && db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;

// import { Sequelize, DataTypes } from "sequelize";
// import sequelize from "../config/mysql.config.js";

// // Importación de Modelos existentes
// import UserModel from "./user.model.js";
// import RolModel from "./rol.model.js";
// import TipoDocumentoModel from "./document_type.model.js";
// import EmployeeModel from "./employee.model.js";
// import SupplierModel from "./supplier.model.js";
// import ZonaModel from "./zona.model.js";
// import CustomerModel from "./customer.model.js";
// import CategoryModel from "./category.model.js";
// import ProductModel from "./product.model.js";

// // 1. IMPORTACIÓN DE MODELOS DE COMPRAS
// import PurchaseModel from "./shopping.model.js";
// import PurchaseDetailModel from "./shopping_detail.model.js";

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // Inicialización de modelos
// db.Usuario       = UserModel(sequelize, DataTypes);
// db.Rol           = RolModel(sequelize, DataTypes);
// db.TipoDocumento = TipoDocumentoModel(sequelize, DataTypes);
// db.Empleado      = EmployeeModel(sequelize, DataTypes);
// db.Supplier      = SupplierModel(sequelize, DataTypes);
// db.Zona          = ZonaModel(sequelize, DataTypes);
// db.Customer      = CustomerModel(sequelize, DataTypes);
// db.Category      = CategoryModel(sequelize, DataTypes);
// db.Product       = ProductModel(sequelize, DataTypes);

// // 2. INICIALIZACIÓN DE COMPRAS Y DETALLES
// db.Purchase       = PurchaseModel(sequelize, DataTypes);
// db.PurchaseDetail = PurchaseDetailModel(sequelize, DataTypes);

// // Configuración de Asociaciones
// // Gracias a este bloque, las funciones .associate() de tus modelos se ejecutarán automáticamente
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName] && db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// export default db;

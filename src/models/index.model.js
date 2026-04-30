import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/mysql.config.js";

// --- Modelos Geográficos ---
import Department from "./department.model.js";
import Municipality from "./municipality.model.js";

// --- Modelos Base y Negocio ---
import UserModel from "./user.model.js";
import RolModel from "./rol.model.js";
import TipoDocumentoModel from "./document_type.model.js";
import EmployeeModel from "./employee.model.js";
import SupplierModel from "./supplier.model.js";
import ZonaModel from "./zona.model.js";
import CustomerModel from "./customer.model.js";
import CategoryModel from "./category.model.js";
import ProductModel from "./product.model.js";
import PurchaseModel from "./shopping.model.js";
import PurchaseDetailModel from "./shopping_detail.model.js";
import OrderModel from "./order.model.js";
import OrderDetailModel from "./order_detail.model.js";
import SaleModel from "./sale.model.js";
import ReturnModel from "./return.model.js";
import ReturnDetailModel from "./returnDetail.model.js";
import RutaModel from "./ruta.model.js";
import RutaDetailModel from "./rutaDetail.model.js";
import PermissionModel from "./permission.model.js";
import RolePermissionModel from "./rolePermission.model.js";
import CreditModel from "./credit.model.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 1. ASIGNACIÓN DE MODELOS
db.Department = Department;
db.Municipality = Municipality;

db.Usuario = UserModel(sequelize, DataTypes);
db.Rol = RolModel(sequelize, DataTypes);
db.TipoDocumento = TipoDocumentoModel(sequelize, DataTypes);
db.Empleado = EmployeeModel(sequelize, DataTypes);
db.Supplier = SupplierModel(sequelize, DataTypes);
db.Zona = ZonaModel(sequelize, DataTypes);
db.Customer = CustomerModel(sequelize, DataTypes);
db.Category = CategoryModel(sequelize, DataTypes);
db.Product = ProductModel(sequelize, DataTypes);
db.Purchase = PurchaseModel(sequelize, DataTypes);
db.PurchaseDetail = PurchaseDetailModel(sequelize, DataTypes);
db.Order = OrderModel(sequelize, DataTypes);
db.OrderDetail = OrderDetailModel(sequelize, DataTypes);
db.Sale = SaleModel(sequelize, DataTypes);
db.CustomerReturn = ReturnModel(sequelize, DataTypes);
db.ReturnDetail = ReturnDetailModel(sequelize, DataTypes);
db.Ruta = RutaModel(sequelize, DataTypes);
db.RutaDetail = RutaDetailModel(sequelize, DataTypes);
db.Permission = PermissionModel(sequelize, DataTypes);
db.RolePermission = RolePermissionModel(sequelize, DataTypes);
db.Credit = CreditModel(sequelize, DataTypes);

// 2. ASOCIACIONES GEOGRÁFICAS
// Solo definilas aquí si department.model.js y municipality.model.js
// NO tienen associations internas. Si ya las tienen, elimina este bloque.
// Geográficas
db.Department.hasMany(db.Municipality, {
  foreignKey: { name: "departmentId", field: "departamento_id" }, // mismo field que el modelo
  as: "municipios",
});
db.Municipality.belongsTo(db.Department, {
  foreignKey: { name: "departmentId", field: "departamento_id" },
  as: "departamento",
});

// Relación Municipality → Customer
if (!Municipality.associations?.clientes) {
  db.Municipality.hasMany(db.Customer, {
    foreignKey: { name: "municipioId", field: "municipio_id" },
    as: "clientes",
  });
}

if (!db.Customer.associations?.municipio) {
  db.Customer.belongsTo(db.Municipality, {
    foreignKey: { name: "municipioId", field: "municipio_id" },
    as: "municipio",
  });
}

// Relación Municipality → Supplier
if (!Municipality.associations?.proveedores) {
  db.Municipality.hasMany(db.Supplier, {
    foreignKey: { name: "municipioId", field: "municipio_id" },
    as: "proveedores",
  });
}

if (!db.Supplier.associations?.municipio) {
  db.Supplier.belongsTo(db.Municipality, {
    foreignKey: { name: "municipioId", field: "municipio_id" },
    as: "municipio",
  });
}

// 3. ASOCIACIONES AUTOMÁTICAS (modelos factory)
Object.keys(db).forEach((modelName) => {
  if (db[modelName] && db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;

// import { Sequelize, DataTypes } from "sequelize";
// import sequelize from "../config/mysql.config.js";

// // Importación de Modelos base
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

// // 2. IMPORTACIÓN DE MODELOS DE PEDIDOS
// import OrderModel from "./order.model.js";
// import OrderDetailModel from "./order_detail.model.js";

// // 3. IMPORTACIÓN DE MODELO DE VENTAS
// import SaleModel from "./sale.model.js";

// // 4. IMPORTACIÓN DE MODELOS DE DEVOLUCIONES
// import ReturnModel from "./return.model.js";
// import ReturnDetailModel from "./returnDetail.model.js";

// // 5. IMPORTACIÓN DE MODELOS DE RUTAS (LOGÍSTICA)
// import RutaModel from "./ruta.model.js";
// import RutaDetailModel from "./rutaDetail.model.js";

// // 6. IMPORTACIÓN DE SEGURIDAD (ROLES Y PERMISOS)
// import PermissionModel from "./permission.model.js";
// import RolePermissionModel from "./rolePermission.model.js";

// // 7. IMPORTACIÓN DE GESTIÓN FINANCIERA (NUEVO)
// import CreditModel from "./credit.model.js";

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// // Inicialización de modelos base
// db.Usuario = UserModel(sequelize, DataTypes);
// db.Rol = RolModel(sequelize, DataTypes);
// db.TipoDocumento = TipoDocumentoModel(sequelize, DataTypes);
// db.Empleado = EmployeeModel(sequelize, DataTypes);
// db.Supplier = SupplierModel(sequelize, DataTypes);
// db.Zona = ZonaModel(sequelize, DataTypes);
// db.Customer = CustomerModel(sequelize, DataTypes);
// db.Category = CategoryModel(sequelize, DataTypes);
// db.Product = ProductModel(sequelize, DataTypes);

// // INICIALIZACIÓN DE COMPRAS
// db.Purchase = PurchaseModel(sequelize, DataTypes);
// db.PurchaseDetail = PurchaseDetailModel(sequelize, DataTypes);

// // INICIALIZACIÓN DE PEDIDOS
// db.Order = OrderModel(sequelize, DataTypes);
// db.OrderDetail = OrderDetailModel(sequelize, DataTypes);

// // INICIALIZACIÓN DE VENTAS
// db.Sale = SaleModel(sequelize, DataTypes);

// // INICIALIZACIÓN DE DEVOLUCIONES
// db.CustomerReturn = ReturnModel(sequelize, DataTypes);
// db.ReturnDetail = ReturnDetailModel(sequelize, DataTypes);

// // INICIALIZACIÓN DE RUTAS
// db.Ruta = RutaModel(sequelize, DataTypes);
// db.RutaDetail = RutaDetailModel(sequelize, DataTypes);

// // INICIALIZACIÓN DE SEGURIDAD
// db.Permission = PermissionModel(sequelize, DataTypes);
// db.RolePermission = RolePermissionModel(sequelize, DataTypes);

// // INICIALIZACIÓN DE GESTIÓN FINANCIERA (NUEVO)
// db.Credit = CreditModel(sequelize, DataTypes);

// // Configuración de Asociaciones
// Object.keys(db).forEach((modelName) => {
//   if (db[modelName] && db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// export default db;

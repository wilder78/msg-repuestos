import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

export default sequelize;


// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT || 3306,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // Exportamos el pool para usarlo en otros archivos
// export default pool;

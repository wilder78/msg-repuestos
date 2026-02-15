import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportamos el pool para usarlo en otros archivos
export default pool;

// import mysql from "mysql2/promise";
// import dotenv from "dotenv";

// dotenv.config(); // 👈 Cargar variables del archivo .env

// // 🔗 Conexión a MySQL
// export const connectMySQL = async () => {
//   try {
//     const connection = await mysql.createConnection({
//       host: process.env.DB_HOST,       // Servidor desde .env
//       port: process.env.DB_PORT,       // Puerto desde .env
//       user: process.env.DB_USER,       // Usuario desde .env
//       password: process.env.DB_PASSWORD, // Contraseña desde .env
//       database: process.env.DB_NAME,   // Nombre de la BD desde .env
//     });

//     console.log("✅ Conectado a MySQL correctamente");
//     return connection;
//   } catch (error) {
//     console.error("❌ Error conectando a MySQL:", error.message);
//     throw error;
//   }
// };

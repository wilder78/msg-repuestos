import "dotenv/config"; // Carga las variables automáticamente
import express from "express";
import db from "./config/mysql.config.js"; // ⚠️ IMPORTANTE: En ES Modules la extensión .js es obligatoria

const app = express();
app.use(express.json());

// Prueba de conexión
try {
  const connection = await db.getConnection();
  console.log("✅ Conexión a MySQL exitosa (Tienda de Repuestos)");
  connection.release();
} catch (err) {
  console.error("❌ Error conectando a la base de datos:", err.message);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

// import express from "express";

// const app = express();

// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// app.listen(8080, () => {
//   console.log("Server on port 8080");
// });

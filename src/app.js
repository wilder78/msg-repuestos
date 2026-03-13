import express from "express";
import cors from "cors";
import path from "path"; // Necesario para manejar rutas de archivos
import { fileURLToPath } from "url"; // Necesario para __dirname en ES Modules
import "dotenv/config";
import indexRoutes from "./routes/index.routes.js";
import db from "./models/index.model.js";

const app = express();

// --- CONFIGURACIÓN DE RUTAS PARA ES MODULES ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- 1. MIDDLEWARES GLOBALES ---

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", // Usar variable de entorno
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 2. ARCHIVOS ESTÁTICOS (VITAL PARA EL PDF) ---

// Esto permite que http://localhost:8080/reports/returns/archivo.pdf sea accesible
app.use("/reports", express.static(path.join(__dirname, "../public/reports")));

// --- 3. RUTAS ---

app.use("/api", indexRoutes);

// --- 4. MANEJO DE ERRORES ---

// Manejo de rutas 404
app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.originalUrl,
  });
});

// Manejo global de errores (500)
app.use((err, req, res, next) => {
  console.error("❌ Error no manejado:", err.stack);
  res.status(err.status || 500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Error interno del servidor"
        : err.message,
  });
});

// --- 5. INICIO DEL SERVIDOR ---

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Conexión a MySQL exitosa (MSG Repuestos)");

    // Sincronización controlada
    if (process.env.NODE_ENV === "development") {
      // alter: false para evitar que Sequelize cambie tus tablas con Triggers manuales
      await db.sequelize.sync({ alter: false }); 
      console.log("📋 Modelos verificados");
    }

    const PORT = process.env.PORT || 8080;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Motor MSG corriendo en: http://localhost:${PORT}`);
    });

    // Graceful Shutdown
    process.on("SIGTERM", () => {
      server.close(async () => {
        await db.sequelize.close();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("❌ Error crítico:", error.message);
    process.exit(1);
  }
}

startServer();

// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import indexRoutes from "./routes/index.routes.js";
// import db from "./models/index.model.js";

// const app = express();

// // --- 1. MIDDLEWARES GLOBALES ---

// // Configuración de CORS: Permite que el Frontend (Vite) acceda a la API
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   }),
// );

// // Procesamiento de datos (Body Parsers)
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // --- 2. RUTAS ---

// // Prefijo global para la API
// app.use("/api", indexRoutes);

// // --- 3. MANEJO DE ERRORES ---

// // Manejo de rutas 404 (No encontradas)
// app.use((req, res) => {
//   res.status(404).json({
//     error: "Ruta no encontrada",
//     path: req.originalUrl,
//   });
// });

// // Manejo global de errores (500)
// app.use((err, req, res, next) => {
//   console.error("❌ Error no manejado:", err.stack);
//   res.status(err.status || 500).json({
//     error:
//       process.env.NODE_ENV === "production"
//         ? "Error interno del servidor"
//         : err.message,
//   });
// });

// // --- 4. INICIO DEL SERVIDOR ---

// async function startServer() {
//   try {
//     // Autentica la conexión con la base de datos MySQL
//     await db.sequelize.authenticate();
//     console.log("✅ Conexión a MySQL exitosa (MSG Repuestos)");

//     // Sincroniza modelos (Solo en ambiente de desarrollo)
//     if (process.env.NODE_ENV === "development") {
//       await db.sequelize.sync({ alter: false });
//       console.log("📋 Modelos sincronizados");
//     }

//     const PORT = process.env.PORT || 8080;
//     const server = app.listen(PORT, () => {
//       console.log(
//         `🚀 Motor de tienda MSG corriendo en: http://localhost:${PORT}`,
//       );
//       console.log(`📡 Ambiente: ${process.env.NODE_ENV || "development"}`);
//     });

//     // Cierre controlado del servidor (Graceful Shutdown)
//     process.on("SIGTERM", () => {
//       console.log("⚠️ SIGTERM recibido. Cerrando servidor...");
//       server.close(async () => {
//         await db.sequelize.close();
//         console.log("✅ Servidor y base de datos cerrados correctamente");
//         process.exit(0);
//       });
//     });
//   } catch (error) {
//     console.error("❌ Error crítico al iniciar:", error.message);
//     process.exit(1);
//   }
// }

// startServer();

import express from "express";
import cors from "cors";
import "dotenv/config";
import indexRoutes from "./routes/index.routes.js";
import db from "./models/index.model.js";

const app = express();

// --- 1. MIDDLEWARES GLOBALES ---

// Configuración de CORS: Permite que el Frontend (Vite) acceda a la API
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Procesamiento de datos (Body Parsers)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 2. RUTAS ---

// Prefijo global para la API
app.use("/api", indexRoutes);

// --- 3. MANEJO DE ERRORES ---

// Manejo de rutas 404 (No encontradas)
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

// --- 4. INICIO DEL SERVIDOR ---

async function startServer() {
  try {
    // Autentica la conexión con la base de datos MySQL
    await db.sequelize.authenticate();
    console.log("✅ Conexión a MySQL exitosa (MSG Repuestos)");

    // Sincroniza modelos (Solo en ambiente de desarrollo)
    if (process.env.NODE_ENV === "development") {
      await db.sequelize.sync({ alter: false });
      console.log("📋 Modelos sincronizados");
    }

    const PORT = process.env.PORT || 8080;
    const server = app.listen(PORT, () => {
      console.log(
        `🚀 Motor de tienda MSG corriendo en: http://localhost:${PORT}`,
      );
      console.log(`📡 Ambiente: ${process.env.NODE_ENV || "development"}`);
    });

    // Cierre controlado del servidor (Graceful Shutdown)
    process.on("SIGTERM", () => {
      console.log("⚠️ SIGTERM recibido. Cerrando servidor...");
      server.close(async () => {
        await db.sequelize.close();
        console.log("✅ Servidor y base de datos cerrados correctamente");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("❌ Error crítico al iniciar:", error.message);
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

// // Middlewares
// // Middlewares
// // 2. Configurar CORS (Permite que React se conecte)
// app.use(
//   cors({
//     origin: "http://localhost:5173", // URL por defecto de Vite
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   }),
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Prefijo global /api
// app.use("/api", indexRoutes);
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // Para formularios

// // Prefijo global /api
// app.use("/api", indexRoutes);

// // Manejo de rutas no encontradas
// app.use((req, res) => {
//   res.status(404).json({
//     error: "Ruta no encontrada",
//     path: req.originalUrl,
//   });
// });

// // Manejo global de errores
// app.use((err, req, res, next) => {
//   console.error("❌ Error no manejado:", err.stack);
//   res.status(err.status || 500).json({
//     error:
//       process.env.NODE_ENV === "production"
//         ? "Error interno del servidor"
//         : err.message,
//   });
// });

// // Función de inicio del servidor
// async function startServer() {
//   try {
//     // Autentica la conexión con la base de datos
//     await db.sequelize.authenticate();
//     console.log("✅ Conexión a MySQL exitosa (MSG Repuestos)");

//     // Sincroniza modelos (opcional - solo en desarrollo)
//     if (process.env.NODE_ENV === "development") {
//       await db.sequelize.sync({ alter: false }); // Cambia a true si quieres alterar tablas
//       console.log("📋 Modelos sincronizados");
//     }

//     const PORT = process.env.PORT || 8080;
//     const server = app.listen(PORT, () => {
//       console.log(
//         `🚀 Motor de tienda MSG corriendo en: http://localhost:${PORT}`,
//       );
//       console.log(`📡 Ambiente: ${process.env.NODE_ENV || "development"}`);
//     });

//     // Manejo de cierre graceful
//     process.on("SIGTERM", () => {
//       console.log("⚠️ SIGTERM recibido. Cerrando servidor...");
//       server.close(async () => {
//         await db.sequelize.close();
//         console.log("✅ Servidor cerrado correctamente");
//         process.exit(0);
//       });
//     });
//   } catch (error) {
//     console.error(
//       "❌ Error crítico al conectar la base de datos:",
//       error.message,
//     );
//     console.error("Detalles:", error);
//     process.exit(1);
//   }
// }

// startServer();

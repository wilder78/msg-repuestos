import dotenv from "dotenv";
dotenv.config(); // Carga variables del archivo .env

import initApp from "./app/index.app.js"; // ✅ Import corregido
import { config } from "./config/ruta.config.js";

// Inicializa la aplicación
const app = initApp();

// Puerto de escucha
const PORT = process.env.PORT || config.PORT || 8000;

// Inicia el servidor
const server = app.listen(PORT, () => {
  console.info(`🚀 Servidor iniciado en: http://127.0.0.1:${PORT}`);
});

// Manejo de errores del servidor
server.on("error", (error) => {
  console.error("❌ Error en el servidor:", error.message || error);
});

// import initApp from "./app/index.app.js";
// import { config } from "./config/ruta.config.js";

// // Inicializa la aplicación
// const app = initApp();

// // Puerto de escucha
// const PORT = config.PORT || 8000;

// // Inicia el servidor
// const server = app.listen(PORT, () => {
//   console.info(`🚀 Servidor iniciado en: http://127.0.0.1:${PORT}`);
// });

// // Manejo de errores del servidor
// server.on("error", (error) => {
//   console.error("❌ Error en el servidor:", error.message || error);
// });

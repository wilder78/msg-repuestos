import initApp from "./app/index.app.js";
import { config } from "./config/ruta.config.js";

// Inicializa la aplicación
const app = initApp();

// Puerto de escucha
const PORT = config.PORT || 8000;

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

// const app = initApp();
// const PORT = config.PORT || 8080;

// const server = app.listen(PORT, () => {
//   console.info(`🚀 Server running at: http://localhost:${PORT}`);
// });

// server.on("error", (error) => {
//   console.error("Server error:", error);
// });

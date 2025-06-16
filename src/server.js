import initApp from "./app/index.app.js";
import { config } from "./config/ruta.config.js";

const app = initApp();

// Usamos el puerto definido en la configuración
const PORT = config.PORT || 8080;

const server = app.listen(PORT, () => {
  console.info(`🚀 Server running at: http://localhost:${PORT}`);
});

// Manejo de errores del servidor
server.on("error", (error) => {
  console.error("Error en el servidor:", error);
});

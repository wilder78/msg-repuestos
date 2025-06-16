import initApp from "./app/index.app.js";
import { config } from "./config/ruta.config.js";

const app = initApp();

// Usamos el puerto definido en la configuración
const PORT = config.PORT || 8080;

const server = app.listen(PORT, () => {
  console.info(`🚀 Server running at: http://localhost:${PORT}`);
});

// import initApp from "./app/index.app.js";
// import { config } from "./config/ruta.config.js";

// const app = initApp();

// const server = app.listen(8080, () => {
//   console.info("Server listen on http://localhost:8080");
// });

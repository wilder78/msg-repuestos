import initApp from "./app/index.app.js";
import { config } from "./config/ruta.config.js";

const app = initApp();
const PORT = config.PORT || 8080;

const server = app.listen(PORT, () => {
  console.info(`🚀 Server running at: http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.error("Server error:", error);
});

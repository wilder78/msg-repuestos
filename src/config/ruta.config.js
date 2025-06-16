import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Obtenemos el archivo actual y su ruta base
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), "../../"); // Ruta raíz del proyecto

export const config = {
  dirname: __dirname, // Ruta raíz del proyecto
  PORT: 8080,
};

console.info("Ruta raíz del proyecto:", config.dirname);

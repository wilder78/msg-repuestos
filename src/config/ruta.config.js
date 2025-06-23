import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), "../../");

export const config = {
  dirname: __dirname,
  PORT: 8080,
};

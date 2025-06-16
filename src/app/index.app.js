import path from "path";
import express from "express";
import { config } from "../config/ruta.config.js";
import indexRouter from "../routes/index.route.js"; // Aquí se manejan las rutas de la API

const initApp = () => {
  const app = express();

  // ✅ Middleware para parsear JSON y formularios
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ✅ Archivos estáticos
  app.use(express.static(path.join(config.dirname, "public")));

  // ✅ Ruta principal para el archivo HTML
  app.get("/", (req, res) => {
    res.sendFile(path.join(config.dirname, "public", "index.html"));
  });

  // ✅ Rutas de la API (modularizadas)
  app.use("/api", indexRouter); // <-- Aquí se cargan las rutas desde index.route.js

  return app;
};

export default initApp;

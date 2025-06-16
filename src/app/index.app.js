import express from "express";
import { config } from "../config/ruta.config.js";
import path from "path";

const initApp = () => {
  const app = express();

  // Middleware para parsear JSON y datos de formularios
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Ruta para archivos estáticos (corregido uso de path)
  app.use(express.static(path.join(config.dirname, "public")));

  return app;
};

export default initApp;




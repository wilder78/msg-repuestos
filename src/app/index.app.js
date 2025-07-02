import path from "path";
import express from "express";
import { config } from "../config/ruta.config.js";
import indexRouter from "../routes/index.route.js";

const initApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(config.projectRoot, "public")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(config.projectRoot, "public", "index.html"));
  });

  app.use("/api/products", indexRouter);

  return app;
};

export default initApp;

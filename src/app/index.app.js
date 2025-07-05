import path from "path";
import express from "express";
import { config } from "../config/ruta.config.js";
import { connectMongoDB } from "../config/mongodb.config.js";
import indexRouter from "../routes/index.route.js"; // <-- barril

const initApp = () => {
  const app = express();

  connectMongoDB();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(config.projectRoot, "public")));

  app.get("/", (req, res) => {
    res.sendFile(path.join(config.projectRoot, "public", "index.html"));
  });

  // Usa el barril para montar todas las rutas agrupadas
  app.use("/api/products", indexRouter); // /api/products

  return app;
};

export default initApp;

// import path from "path";
// import express from "express";
// import { config } from "../config/ruta.config.js";
// import { connectMongoDB } from "../config/mongodb.config.js";
// import indexRouter from "../routes/index.route.js";
// // import productsRouter from "../routes/products.route.js"; // ⬅ nuevo nombre claro

// const initApp = () => {
//   const app = express();

//   // Conexión a la base de datos MongoDB
//   connectMongoDB();

//   // Middlewares para parsing
//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));

//   // Archivos estáticos (HTML, CSS, JS del frontend)
//   app.use(express.static(path.join(config.projectRoot, "public")));

//   // Ruta principal
//   app.get("/", (req, res) => {
//     res.sendFile(path.join(config.projectRoot, "public", "index.html"));
//   });

//   // Rutas API
//   app.use("/api/products", productsRouter); // ⬅ para /api/products

//   return app;
// };

// export default initApp;

// import path from "path";
// import express from "express";
// import { config } from "../config/ruta.config.js";
// import indexRouter from "../routes/index.route.js";
// import { connectMongoDB } from "../config/mongodb.config.js";

// const initApp = () => {
//   const app = express();

//   // Conexión con la base de datos.
//   connectMongoDB();

//   app.use(express.json());
//   app.use(express.urlencoded({ extended: true }));
//   app.use(express.static(path.join(config.projectRoot, "public")));

//   app.get("/", (req, res) => {
//     res.sendFile(path.join(config.projectRoot, "public", "index.html"));
//   });

//   app.use("/api/products", indexRouter);

//   return app;
// };

// export default initApp;

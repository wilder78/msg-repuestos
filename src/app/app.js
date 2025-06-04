// ✅ Importación de módulos ES6 (ECMAScript Modules)
import express from "express";
import path from "path"; // (No se está usando, podrías eliminarlo si no se requiere)

const app = express(); // ✅ Se crea una instancia de la aplicación Express
const port = 3000; // ✅ Se define el puerto donde se ejecutará el servidor

// ✅ Arreglo de productos simulados (como base de datos temporal)
const products = [
  { id: 1, descripcion: "Farola NKD", precio: 30000, cantidad: 20 },
  { id: 2, descripcion: "Espejo Pulsar", precio: 25000, cantidad: 15 },
  { id: 3, descripcion: "Manubrio RX115", precio: 45000, cantidad: 10 },
  { id: 4, descripcion: "Llanta Delantera Boxer", precio: 95000, cantidad: 8 },
  {
    id: 5,
    descripcion: "Filtro de Aceite Discover",
    precio: 12000,
    cantidad: 30,
  },
  { id: 6, descripcion: "Batería CB110", precio: 85000, cantidad: 5 },
  { id: 7, descripcion: "Pastillas de Freno NKD", precio: 18000, cantidad: 25 },
  { id: 8, descripcion: "Retrovisor AKT125", precio: 22000, cantidad: 18 },
  { id: 9, descripcion: "Cadena Apache 160", precio: 60000, cantidad: 12 },
  {
    id: 10,
    descripcion: "Kit de Arrastre Pulsar NS",
    precio: 145000,
    cantidad: 6,
  },
];

// ✅ Ruta raíz — muestra un mensaje simple
app.get("/", (req, res) => {
  res.send("Estoy en el home");
});

// ✅ Ruta para obtener todos los productos
app.get("/product", (req, res) => {
  res.send({ products });
});

// ✅ Ruta para obtener un producto por su ID
app.get("/product/:id", (req, res) => {
  try {
    const { id } = req.params; // Extrae el parámetro de la URL
    const parsedId = Number(id); // Convierte el ID a número

    if (isNaN(parsedId)) {
      throw new Error("El ID debe ser un número válido");
    }

    const product = products.find((p) => p.id === parsedId); // Busca el producto

    if (!product) {
      return res.status(404).send({ error: "Producto no encontrado" });
    }

    res.send({ product }); // Envía el producto encontrado
  } catch (error) {
    res.status(400).send({ error: error.message }); // Maneja errores
  }
});

// ✅ Se inicia el servidor y escucha en el puerto definido
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// // Importación del modulo de express (ESM)
// import { error } from "console";
// import express, { response } from "express";
// import path from "path";

// const app = express();
// const port = 3000;

// const products = [
//   { id: 1, descripcion: "Farola NKD", precio: 30000, cantidad: 20 },
//   { id: 2, descripcion: "Espejo Pulsar", precio: 25000, cantidad: 15 },
//   { id: 3, descripcion: "Manubrio RX115", precio: 45000, cantidad: 10 },
//   { id: 4, descripcion: "Llanta Delantera Boxer", precio: 95000, cantidad: 8 },
//   {
//     id: 5,
//     descripcion: "Filtro de Aceite Discover",
//     precio: 12000,
//     cantidad: 30,
//   },
//   { id: 6, descripcion: "Batería CB110", precio: 85000, cantidad: 5 },
//   { id: 7, descripcion: "Pastillas de Freno NKD", precio: 18000, cantidad: 25 },
//   { id: 8, descripcion: "Retrovisor AKT125", precio: 22000, cantidad: 18 },
//   { id: 9, descripcion: "Cadena Apache 160", precio: 60000, cantidad: 12 },
//   {
//     id: 10,
//     descripcion: "Kit de Arrastre Pulsar NS",
//     precio: 145000,
//     cantidad: 6,
//   },
// ];

// app.get("/", (req, res) => {
//   res.send("Estoy en el home");
// });

// app.get("/product", (req, res) => {
//   res.send({ products });
// });

// app.get("/product/:id", (req, res) => {
//   try {
//     console.log(req.params);
//     const { id } = req.params;
//     const parsedId = Number(id);

//     if (isNaN(parsedId)) {
//       throw new Error("El ID debe ser un número válido");
//     }

//     const product = products.find((p) => p.id === parsedId);

//     if (!product) {
//       return res.status(404).send({ error: "Producto no encontrado" });
//     }

//     res.send({ product });
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });

// app.listen(port, () => {
//   console.log(`Servidor escuchando en http://localhost:${port}`);
// });

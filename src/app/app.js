// ✅ Importación de módulos ES6 (ECMAScript Modules)
import express from "express";

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



// ✅ Se inicia el servidor y escucha en el puerto definido
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});


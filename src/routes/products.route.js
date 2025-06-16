import { Router } from "express";

export const ProductsRouter = Router();

// 🗂️ Productos simulados (mock data)
const products = [
  {
    id: 1,
    descripcion: "Farola NKD",
    codigo: "FRL-NKD-001",
    categoria: "Iluminación",
    marca: "Auteco",
    precio: 30000,
    precio_compra: 25000,
    cantidad: 20,
    unidad_medida: "pieza",
    estado: "activo",
    fecha_registro: "2025-06-15",
    imagen_url: "/images/farola-nkd.jpg",
    proveedor: "Repuestos Auteco S.A.",
  },
  {
    id: 2,
    descripcion: "Espejo Pulsar",
    codigo: "ESP-PLS-002",
    categoria: "Accesorios",
    marca: "Bajaj",
    precio: 25000,
    precio_compra: 20000,
    cantidad: 15,
    unidad_medida: "par",
    estado: "activo",
    fecha_registro: "2025-06-15",
    imagen_url: "/images/espejo-pulsar.jpg",
    proveedor: "Distribuidora Bajaj Ltda.",
  },
  {
    id: 3,
    descripcion: "Manubrio RX115",
    codigo: "MNB-RX115-003",
    categoria: "Dirección",
    marca: "Yamaha",
    precio: 45000,
    precio_compra: 38000,
    cantidad: 10,
    unidad_medida: "pieza",
    estado: "activo",
    fecha_registro: "2025-06-15",
    imagen_url: "/images/manubrio-rx115.jpg",
    proveedor: "Yamaha Repuestos",
  },
  {
    id: 4,
    descripcion: "Llanta Delantera Boxer",
    codigo: "LLD-BXR-004",
    categoria: "Llantas",
    marca: "Pirelli",
    precio: 95000,
    precio_compra: 80000,
    cantidad: 8,
    unidad_medida: "unidad",
    estado: "activo",
    fecha_registro: "2025-06-15",
    imagen_url: "/images/llanta-boxer.jpg",
    proveedor: "Llantas Colombia",
  },
  {
    id: 5,
    descripcion: "Filtro de Aceite Discover",
    codigo: "FAD-DSC-005",
    categoria: "Filtros",
    marca: "Discover",
    precio: 12000,
    precio_compra: 9000,
    cantidad: 30,
    unidad_medida: "pieza",
    estado: "activo",
    fecha_registro: "2025-06-15",
    imagen_url: "/images/filtro-aceite-discover.jpg",
    proveedor: "Filtros Express S.A.S.",
  },
  {
    id: 6,
    descripcion: "Batería CB110",
    codigo: "BAT-CB110-006",
    categoria: "Eléctrico",
    marca: "Honda",
    precio: 85000,
    precio_compra: 70000,
    cantidad: 5,
    unidad_medida: "unidad",
    estado: "activo",
    fecha_registro: "2025-06-15",
    imagen_url: "/images/bateria-cb110.jpg",
    proveedor: "Energías Honda",
  },
  {
    id: 7,
    descripcion: "Pastillas de Freno NKD",
    codigo: "PFR-NKD-007",
    categoria: "Frenos",
    marca: "Auteco",
    precio: 18000,
    precio_compra: 14000,
    cantidad: 25,
    unidad_medida: "juego",
    estado: "activo",
    fecha_registro: "2025-06-15",
    imagen_url: "/images/pastillas-nkd.jpg",
    proveedor: "Autopartes S.A.",
  },
  {
    id: 8,
    descripcion: "Retrovisor AKT125",
    codigo: "RTV-AKT125-008",
    categoria: "Accesorios",
    marca: "AKT",
    precio: 22000,
    precio_compra: 18000,
    cantidad: 18,
    unidad_medida: "par",
    estado: "activo",
    fecha_registro: "2025-06-15",
    imagen_url: "/images/retrovisor-akt.jpg",
    proveedor: "Repuestos AKT S.A.S.",
  },
  {
    id: 9,
    descripcion: "Cadena Apache 160",
    codigo: "CDN-AP160-009",
    categoria: "Transmisión",
    marca: "TVS",
    precio: 60000,
    precio_compra: 50000,
    cantidad: 12,
    unidad_medida: "pieza",
    estado: "activo",
    fecha_registro: "2025-06-15",
    imagen_url: "/images/cadena-apache.jpg",
    proveedor: "Distribuidora TVS",
  },
  {
    id: 10,
    descripcion: "Kit de Arrastre Pulsar NS",
    codigo: "KAR-PLNS-010",
    categoria: "Transmisión",
    marca: "Bajaj",
    precio: 145000,
    precio_compra: 120000,
    cantidad: 6,
    unidad_medida: "kit",
    estado: "activo",
    fecha_registro: "2025-06-15",
    imagen_url: "/images/kit-arrastre-pulsar.jpg",
    proveedor: "Partes Bajaj Colombia",
  },
];

// 📦 Ruta: GET /api/products
ProductsRouter.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Lista de productos",
    data: products,
  });
});

// 📦 Ruta: GET /api/products/:id
ProductsRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Producto no encontrado",
    });
  }

  res.status(200).json({
    success: true,
    message: "Producto encontrado",
    data: product,
  });
});

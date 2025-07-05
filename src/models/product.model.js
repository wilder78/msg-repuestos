import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  descripcion: String,
  codigo: { type: String, unique: true },
  categoria: String,
  marca: String,
  precio: Number,
  precio_compra: Number,
  cantidad: Number,
  unidad_medida: String,
  estado: String,
  fecha_registro: { type: Date, default: Date.now },
  imagen_url: String,
  proveedor: String
});

export const Product = mongoose.model("Product", productSchema);

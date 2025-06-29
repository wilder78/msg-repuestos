export const validationInputProducts = (req, res, next) => {
  const { body } = req;

  // Validar que el cuerpo exista y sea un objeto
  if (!body || typeof body !== "object") {
    return res
      .status(400)
      .json({ error: "El cuerpo de la solicitud no es válido." });
  }

  const {
    descripcion,
    codigo,
    categoria,
    marca,
    precio,
    precio_compra,
    cantidad,
    unidad_medida,
    estado,
    fecha_registro,
    imagen_url,
    proveedor,
  } = body;

  // Validar campos obligatorios
  const camposObligatorios = { descripcion, codigo, categoria, marca, precio };
  const camposFaltantes = Object.entries(camposObligatorios)
    .filter(([_, valor]) => valor == null || valor === "")
    .map(([campo]) => campo);

  if (camposFaltantes.length > 0) {
    return res.status(400).json({
      error: `Faltan campos requeridos: ${camposFaltantes.join(", ")}`,
    });
  }

  // Validar tipo de dato para el precio
  if (typeof precio !== "number" || precio <= 0) {
    return res
      .status(400)
      .json({ error: "El precio debe ser un número positivo." });
  }

  // Validaciones opcionales (puedes ampliarlas si quieres)
  if (precio_compra && (typeof precio_compra !== "number" || precio_compra < 0)) {
    return res
      .status(400)
      .json({ error: "El precio de compra debe ser un número válido." });
  }

  if (cantidad && (typeof cantidad !== "number" || cantidad < 0)) {
    return res
      .status(400)
      .json({ error: "La cantidad debe ser un número válido." });
  }

  next(); // Todo está bien, continuar
};

// export const validationInputProducts = (req, res, next) => {
//   if (!req.body || typeof req.body !== "object") {
//     return res
//       .status(400)
//       .json({ error: "El cuerpo de la solicitud no es válido." });
//   }

//     const {
//     descripcion,
//     codigo,
//     categoria,
//     marca,
//     precio,
//     precio_compra,
//     cantidad,
//     unidad_medida,
//     estado,
//     fecha_registro,
//     imagen_url,
//     proveedor,
//   } = req.body;

//   if (!descripcion || !codigo || !categoria || !marca || precio == null) {
//     return res.status(400).json({ error: "Faltan campos requeridos." });
//   }

//   if (typeof precio !== "number" || precio <= 0) {
//     return res
//       .status(400)
//       .json({ error: "El precio debe ser un número positivo." });
//   }

//   next();
// };

// export const validationInputProducts = (req, res, next) => {
//   // Validar que req.body cumpla con los requerimientos
//   console.log("Estoy en el middleware");
//   next();
// };

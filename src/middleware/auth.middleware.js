import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // Obtenemos el token del header 'Authorization'
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Acceso denegado. No se proporcionó un token." });
  }

  try {
    // Verificamos el token con la clave secreta de tu .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos los datos del usuario para usarlo después
    next(); // Si todo está bien, pasamos a la siguiente función
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado." });
  }
};
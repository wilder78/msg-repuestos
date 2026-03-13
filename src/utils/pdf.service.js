import PDFDocument from "pdfkit";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

// Configuración de rutas para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateReturnPDF = async (returnData, details) => {
  return new Promise((resolve, reject) => {
    try {
      // 1. Definir la ruta de guardado absoluta hacia 'public/reports/returns'
      // Esto asegura que coincida con lo que configuramos en app.js
      const fileName = `NotaCredito_${returnData.idDevolucion}.pdf`;
      const reportsDir = path.join(__dirname, "../../public/reports/returns");
      const filePath = path.join(reportsDir, fileName);

      // 2. Asegurar que la carpeta exista antes de escribir
      fs.ensureDirSync(reportsDir);

      const doc = new PDFDocument({
        margin: 50,
        size: "A4", // Estándar para documentos comerciales
      });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // --- ENCABEZADO ---
      // Si tienes un logo, podrías añadirlo aquí: doc.image('path/to/logo.png', 50, 45, { width: 50 });
      doc.fontSize(20).text("MSG REPUESTOS", { align: "left" });
      doc.fontSize(16).text("NOTA DE CRÉDITO", { align: "center" });
      doc.moveDown();

      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text(`Nro. Devolución: ${returnData.idDevolucion}`, {
          align: "right",
        });
      doc
        .font("Helvetica")
        .text(`Fecha Emisión: ${new Date().toLocaleString()}`, {
          align: "right",
        });
      doc.text(`Venta Referencia: # ${returnData.idVenta}`, { align: "right" });

      doc.moveDown();
      doc.lineCap("butt").moveTo(50, doc.y).lineTo(550, doc.y).stroke();
      doc.moveDown();

      doc.font("Helvetica-Bold").text("DATOS DEL CLIENTE:");
      doc.font("Helvetica").text(`Cliente ID: ${returnData.idCliente}`);
      doc.text(`Concepto: ${returnData.tipoAjuste}`);
      doc.text(`Motivo ID: ${returnData.idMotivo}`);
      doc.moveDown();

      // --- TABLA DE DETALLES ---
      const tableTop = doc.y;
      doc.font("Helvetica-Bold");
      doc.text("Producto ID", 50, tableTop);
      doc.text("Cant. Devuelta", 150, tableTop);
      doc.text("Precio Unit.", 280, tableTop);
      doc.text("Subtotal", 450, tableTop);

      doc
        .moveTo(50, tableTop + 15)
        .lineTo(550, tableTop + 15)
        .stroke();

      let y = tableTop + 25;
      doc.font("Helvetica");

      details.forEach((item) => {
        // Validamos que los datos existan para evitar errores de renderizado
        doc.text(item.idProducto?.toString() || "N/A", 50, y);
        doc.text(item.cantidadDevuelta?.toString() || "0", 150, y);
        doc.text(`$ ${Number(item.precioUnitario).toLocaleString()}`, 280, y);
        doc.text(`$ ${Number(item.subtotalLinea).toLocaleString()}`, 450, y);
        y += 20;

        // Si la tabla es muy larga, podrías añadir lógica de nueva página aquí
      });

      // --- TOTAL ---
      doc
        .moveTo(350, y + 10)
        .lineTo(550, y + 10)
        .stroke();
      doc.moveDown();
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text(
          `TOTAL AJUSTE: $ ${Number(returnData.totalAjuste).toLocaleString()}`,
          { align: "right" },
        );

      // Pie de página
      doc
        .fontSize(8)
        .font("Helvetica-Oblique")
        .text(
          "Este documento es una constancia de devolución de mercancía y ajuste de inventario.",
          50,
          700,
          { align: "center" },
        );

      doc.end();

      // Resolvemos con el nombre del archivo cuando el stream termine
      stream.on("finish", () => resolve(fileName));
      stream.on("error", (err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};

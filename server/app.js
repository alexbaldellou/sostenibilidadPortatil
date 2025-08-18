const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3001;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Permitir CORS para todas las peticiones
app.use(cors());

app.get("/", (req, res) => {
  res.send("API de Sostenibilidad Personal");
});

app.get("/api/metrics", (req, res) => {
  const filePath = path.join(__dirname, "daily_metrics.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error al leer el archivo:", err);
      return res
        .status(500)
        .json({ error: "No se pudo leer el archivo de métricas." });
    }

    try {
      const metrics = JSON.parse(data);
      res.json(metrics);
    } catch (parseError) {
      console.error("Error al parsear JSON:", parseError);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

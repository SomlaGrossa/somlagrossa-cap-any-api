const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Permite conexiones desde cualquier origen
app.use(express.json()); // Permite recibir JSON en las solicitudes

// Importar lógica desde script.js
const verificarPremio = require("./script");

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API de SomlaGrossa en funcionament 🚀");
});

// Ruta para comprobar premios
app.post("/comprovar", (req, res) => {
  const { numero, cantidad } = req.body;
  if (!numero || !cantidad) {
    return res.status(400).json({ error: "Falten dades" });
  }
  const resultado = verificarPremio(numero, cantidad);
  res.json(resultado);
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});

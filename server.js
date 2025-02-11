const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Números premiados
const premios = [
    { numero: 44748, tipo: "Primer Premio", valor: 200000 },
    { numero: 81612, tipo: "Segundo Premio", valor: 65000 },
    { numero: 96522, tipo: "Tercer Premio", valor: 30000 },
    { numero: 22724, tipo: "Cuarto Premio", valor: 10000 },
    { numero: 83387, tipo: "Cuarto Premio", valor: 10000 },
    { numero: 89479, tipo: "Quinto Premio", valor: 5000 },
    { numero: 42111, tipo: "Quinto Premio", valor: 5000 },
    { numero: 97342, tipo: "Quinto Premio", valor: 5000 }
];

// Endpoint para comprobar número
app.get("/comprobar/:numero", (req, res) => {
    const numero = parseInt(req.params.numero);
    const premio = premios.find(p => p.numero === numero);

    if (premio) {
        res.json({ mensaje: `¡Felicidades! Has ganado ${premio.valor}€ (${premio.tipo})` });
    } else {
        res.json({ mensaje: "Lo siento, tu número no ha sido premiado." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

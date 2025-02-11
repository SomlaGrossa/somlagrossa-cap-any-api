const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Números premiados
const premios = [
    { tipo: "Primer Premio", valor: 200000, numero: 44748 },
    { tipo: "Segundo Premio", valor: 65000, numero: 81612 },
    { tipo: "Tercer Premio", valor: 30000, numero: 96522 },
    { tipo: "Cuarto Premio", valor: 10000, numero: 22724 },
    { tipo: "Cuarto Premio", valor: 10000, numero: 83387 },
    { tipo: "Quinto Premio", valor: 5000, numero: 89479 },
    { tipo: "Quinto Premio", valor: 5000, numero: 42111 },
    { tipo: "Quinto Premio", valor: 5000, numero: 97342 }
];

// Ruta para verificar premios
app.post("/verificar", (req, res) => {
    const { numero, cantidad } = req.body;

    if (!numero || numero.length !== 5 || cantidad <= 0) {
        return res.json({ mensaje: "Número o cantidad inválidos." });
    }

    let premioGanado = 0;
    let mensaje = "No has ganado ningún premio.";

    premios.forEach((premio) => {
        if (parseInt(numero) === premio.numero) {
            premioGanado = premio.valor * (cantidad / 10);
            mensaje = `¡Felicidades! Has ganado ${premioGanado.toFixed(2)}€.`;
        }
    });

    res.json({ mensaje });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

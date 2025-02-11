// server.js

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Números premiados de la Grossa de cap d'any 
const premios = [
    { tipo: "Primer Premio", valor: 200000, numero: 44748 },
    { tipo: "Segundo Premio", valor: 65000, numero: 81612 },
    { tipo: "Tercer Premio", valor: 30000, numero: 96522 },
    { tipo: "Cuarto Premio 1", valor: 10000, numero: 22724 },
    { tipo: "Cuarto Premio 2", valor: 10000, numero: 83387 },
    { tipo: "Quinto Premio 1", valor: 5000, numero: 89479 },
    { tipo: "Quinto Premio 2", valor: 5000, numero: 42111 },
    { tipo: "Quinto Premio 3", valor: 5000, numero: 97342 }
];

app.get("/comprobar/:numero", (req, res) => {
    const numero = parseInt(req.params.numero);
    const resultado = premios.find(p => p.numero === numero);
    
    if (resultado) {
        res.json({
            mensaje: "¡Número premiado!",
            premio: resultado.valor,
            tipo: resultado.tipo
        });
    } else {
        res.json({
            mensaje: "Este número no ha sido premiado. Más suerte la próxima vez.",
            premio: 0
        });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

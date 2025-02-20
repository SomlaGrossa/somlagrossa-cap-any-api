const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Para recibir JSON en el body

// Ruta de prueba para verificar que el servidor responde en "/"
app.get("/", (req, res) => {
    res.send("¡Servidor funcionando en Koyeb!");
});

// Números premiados de la Grossa de cap d'any
const premios = [
    { tipo: "Primer Premio", valor: 200000, numero: 44748, premioAdyacente: 2000, premio4Cifras: 1000, premio3Cifras: 250, premio2Cifras: 35, premioUltimaCifra: 10 },
    { tipo: "Segundo Premio", valor: 65000, numero: 81612, premioAdyacente: 650, premio4Cifras: 300, premio3Cifras: 75, premio2Cifras: 25, premioUltimaCifra: 0 },
    { tipo: "Tercer Premio", valor: 30000, numero: 96522, premioAdyacente: 500, premio4Cifras: 200, premio3Cifras: 35, premio2Cifras: 20, premioUltimaCifra: 0 },
    { tipo: "Cuarto Premio 1", valor: 10000, numero: 22724, premioAdyacente: 200, premio4Cifras: 100, premio3Cifras: 30, premio2Cifras: 15, premioUltimaCifra: 0 },
    { tipo: "Cuarto Premio 2", valor: 10000, numero: 83387, premioAdyacente: 200, premio4Cifras: 100, premio3Cifras: 30, premio2Cifras: 15, premioUltimaCifra: 0 },
    { tipo: "Quinto Premio 1", valor: 5000, numero: 89479, premioAdyacente: 150, premio4Cifras: 75, premio3Cifras: 25, premio2Cifras: 10, premioUltimaCifra: 0 },
    { tipo: "Quinto Premio 2", valor: 5000, numero: 42111, premioAdyacente: 150, premio4Cifras: 75, premio3Cifras: 25, premio2Cifras: 10, premioUltimaCifra: 0 },
    { tipo: "Quinto Premio 3", valor: 5000, numero: 97342, premioAdyacente: 150, premio4Cifras: 75, premio3Cifras: 25, premio2Cifras: 10, premioUltimaCifra: 0 }
];

// Función para verificar el premio
function verificarPremio(numero, cantidad) {
    let premioTotal = 0;

    premios.forEach(premio => {
        let mejorPremio = 0;

        if (parseInt(numero) === premio.numero) {
            mejorPremio = premio.valor;
        } else if (parseInt(numero) === premio.numero - 1 || parseInt(numero) === premio.numero + 1) {
            mejorPremio = premio.premioAdyacente;
        } else if (numero.slice(-4) === premio.numero.toString().slice(-4)) {
            mejorPremio = premio.premio4Cifras;
        } else if (numero.slice(-3) === premio.numero.toString().slice(-3)) {
            mejorPremio = premio.premio3Cifras;
        } else if (numero.slice(-2) === premio.numero.toString().slice(-2)) {
            mejorPremio = premio.premio2Cifras;
        } else if (numero.slice(-1) === premio.numero.toString().slice(-1)) {
            mejorPremio = premio.premioUltimaCifra;
        }

        if (mejorPremio > 0) {
            premioTotal += mejorPremio;
        }
    });

    const premioFinal = (premioTotal * cantidad) / 10;
    return { premioTotal: premioFinal };
}

// Ruta POST para comprobar un número
app.post("/comprovador", (req, res) => {
    const { numero, cantidad } = req.body;

    if (!numero || numero.length !== 5) {
        return res.status(400).json({ error: "Si us plau, introdueix un número de 5 cifres." });
    }

    if (!cantidad || cantidad <= 0) {
        return res.status(400).json({ error: "Si us plau, introdueix una quantitat jugada vàlida." });
    }

    const resultado = verificarPremio(numero, cantidad);
    res.json(resultado);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor SomlaGrossa corriendo en http://localhost:${PORT}`);
});

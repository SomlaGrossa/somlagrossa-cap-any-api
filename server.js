const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Números premiados de la Grossa de cap d'any 
const numeroPremiadoPrimerPremio = 44748;
const numeroPremiadoSegundoPremio = 81612;
const numeroPremiadoTercerPremio = 96522;

const numeroPremiadoCuartoPremio1 = 22724;
const numeroPremiadoCuartoPremio2 = 83387;

const numeroPremiadoQuintoPremio1 = 89479;
const numeroPremiadoQuintoPremio2 = 42111;
const numeroPremiadoQuintoPremio3 = 97342;

// Premios asociados a cada tipo de premio
const premios = [
    { tipo: "Primer Premio", valor: 200000, numero: numeroPremiadoPrimerPremio, premioAdyacente: 2000, premio4Cifras: 1000, premio3Cifras: 250, premio2Cifras: 35, premioUltimaCifra: 10 },
    { tipo: "Segundo Premio", valor: 65000, numero: numeroPremiadoSegundoPremio, premioAdyacente: 650, premio4Cifras: 300, premio3Cifras: 75, premio2Cifras: 25, premioUltimaCifra: 0 },
    { tipo: "Tercer Premio", valor: 30000, numero: numeroPremiadoTercerPremio, premioAdyacente: 500, premio4Cifras: 200, premio3Cifras: 35, premio2Cifras: 20, premioUltimaCifra: 0 },
    { tipo: "Cuarto Premio 1", valor: 10000, numero: numeroPremiadoCuartoPremio1, premioAdyacente: 200, premio4Cifras: 100, premio3Cifras: 30, premio2Cifras: 15, premioUltimaCifra: 0 },
    { tipo: "Cuarto Premio 2", valor: 10000, numero: numeroPremiadoCuartoPremio2, premioAdyacente: 200, premio4Cifras: 100, premio3Cifras: 30, premio2Cifras: 15, premioUltimaCifra: 0 },
    { tipo: "Quinto Premio 1", valor: 5000, numero: numeroPremiadoQuintoPremio1, premioAdyacente: 150, premio4Cifras: 75, premio3Cifras: 25, premio2Cifras: 10, premioUltimaCifra: 0 },
    { tipo: "Quinto Premio 2", valor: 5000, numero: numeroPremiadoQuintoPremio2, premioAdyacente: 150, premio4Cifras: 75, premio3Cifras: 25, premio2Cifras: 10, premioUltimaCifra: 0 },
    { tipo: "Quinto Premio 3", valor: 5000, numero: numeroPremiadoQuintoPremio3, premioAdyacente: 150, premio4Cifras: 75, premio3Cifras: 25, premio2Cifras: 10, premioUltimaCifra: 0 }
];

// Ruta para verificar el premio
app.post("/comprovador-grossa", (req, res) => {
    const { numero, cantidad } = req.body;

    if (!numero || numero.length !== 5) {
        return res.json({ error: "Si us plau, introdueix un número de 5 xifres." });
    }

    if (!cantidad || cantidad <= 0) {
        return res.json({ error: "Si us plau, introdueix una quantitat jugada vàlida." });
    }

    let premioTotal = 0;
    let descripciones = [];

    premios.forEach(premioData => {
        let mejorPremio = 0;
        let descripcion = "";
        const numeroPremiado = premioData.numero;

        if (numero == numeroPremiado) {
            mejorPremio = premioData.valor;
            descripcion = `${premioData.valor}€ (${premioData.tipo})`;
        } else if (numero == numeroPremiado - 1 || numero == numeroPremiado + 1) {
            mejorPremio = Math.max(mejorPremio, premioData.premioAdyacente);
            if (mejorPremio === premioData.premioAdyacente) {
                descripcion = `${premioData.premioAdyacente}€ (Número anterior o posterior)`;
            }
        } else if (numero.slice(-4) === numeroPremiado.toString().slice(-4)) {
            mejorPremio = Math.max(mejorPremio, premioData.premio4Cifras);
            descripcion = `${premioData.premio4Cifras}€ (Últimas 4 cifras)`;
        } else if (numero.slice(-3) === numeroPremiado.toString().slice(-3)) {
            mejorPremio = Math.max(mejorPremio, premioData.premio3Cifras);
            descripcion = `${premioData.premio3Cifras}€ (Últimas 3 cifras)`;
        } else if (numero.slice(-2) === numeroPremiado.toString().slice(-2)) {
            mejorPremio = Math.max(mejorPremio, premioData.premio2Cifras);
            descripcion = `${premioData.premio2Cifras}€ (Últimas 2 cifras)`;
        } else if (numero.slice(-1) === numeroPremiado.toString().slice(-1)) {
            mejorPremio = Math.max(mejorPremio, premioData.premioUltimaCifra);
            descripcion = `${premioData.premioUltimaCifra}€ (Última cifra)`;
        }

        if (mejorPremio > 0) {
            premioTotal += mejorPremio;
            descripciones.push(descripcion);
        }
    });

    const premioFinal = (premioTotal * cantidad) / 10;

    if (premioTotal > 0) {
        return res.json({ premio: `${premioFinal}€`, detalles: descripciones });
    } else {
        return res.json({ mensaje: "Aquest número no és guanyador. Més sort la pròxima vegada." });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor SomlaGrossa corriendo en http://localhost:${PORT}`);
});

module.exports = verificarPremio;// script.js

// Números premiados de la Grossa de cap d'any 
const numeroPremiadoPrimerPremio = 44748; // Número 1r Premio
const numeroPremiadoSegundoPremio = 81612; // Número 2n Premio
const numeroPremiadoTercerPremio = 96522; // Número 3r Premio

const numeroPremiadoCuartoPremio1 = 22724; // Número 1r del 4t Premio
const numeroPremiadoCuartoPremio2 = 83387; // Número 2n del 4t Premio

const numeroPremiadoQuintoPremio1 = 89479; // Número 1r del 5t Premio
const numeroPremiadoQuintoPremio2 = 42111; // Número 2n del 5t Premio
const numeroPremiadoQuintoPremio3 = 97342; // Número 3r del 5t Premio

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

// Función para verificar el premio
function verificarPremio() {
    const numero = document.getElementById("numero").value;
    const cantidad = document.getElementById("cantidad").value;
    const resultado = document.getElementById("resultado");

    // Verificar si el número tiene 5 cifras
    if (numero.length !== 5) {
        resultado.innerHTML = "<font color='red'>Si us plau, introdueix un número de 5 cifres.</font>";
        return;
    }

    // Verificar si la cantidad jugada está vacía o es cero
    if (!cantidad || cantidad <= 0) {
        resultado.innerHTML = "<font color='red'>Si us plau, introdueix una quantitat jugada vàlida.</font>";
        return;
    }

    let premioTotal = 0; // Suma total de premios
    let descripciones = []; // Descripciones de los premios ganados

    // Verificación de premios
    premios.forEach(premioData => {
        const tipoPremio = premioData.tipo;
        let mejorPremio = 0;
        let descripcion = "";

        const numeroPremiado = Array.isArray(premioData.numeros) ? premioData.numeros : [premioData.numero];

        numeroPremiado.forEach((numeroPremiadoItem) => {
            // 1. Número exacto (mayor premio)
            if (numero == numeroPremiadoItem) {
                mejorPremio = premioData.valor;
                descripcion = `${premioData.valor.toLocaleString(undefined, { minimumFractionDigits: 2 })}€ (${tipoPremio})`;
            }
            // 2. Número anterior o posterior
            else if (numero == numeroPremiadoItem - 1 || numero == numeroPremiadoItem + 1) {
                mejorPremio = Math.max(mejorPremio, premioData.premioAdyacente);
                if (mejorPremio === premioData.premioAdyacente) {
                    descripcion = `${premioData.premioAdyacente.toLocaleString(undefined, { minimumFractionDigits: 2 })}€ (Número anterior o posterior)`;
                }
            }
            // 3. Últimas cifras (máxima coincidencia por categoría)
            if (numero.slice(-4) === numeroPremiadoItem.toString().slice(-4)) {
                mejorPremio = Math.max(mejorPremio, premioData.premio4Cifras);
                if (mejorPremio === premioData.premio4Cifras) {
                    descripcion = `${premioData.premio4Cifras.toLocaleString(undefined, { minimumFractionDigits: 2 })}€ (Últimas 4 cifras)`;
                }
            }
            if (numero.slice(-3) === numeroPremiadoItem.toString().slice(-3)) {
                mejorPremio = Math.max(mejorPremio, premioData.premio3Cifras);
                if (mejorPremio === premioData.premio3Cifras) {
                    descripcion = `${premioData.premio3Cifras.toLocaleString(undefined, { minimumFractionDigits: 2 })}€ (Últimas 3 cifras)`;
                }
            }
            if (numero.slice(-2) === numeroPremiadoItem.toString().slice(-2)) {
                mejorPremio = Math.max(mejorPremio, premioData.premio2Cifras);
                if (mejorPremio === premioData.premio2Cifras) {
                    descripcion = `${premioData.premio2Cifras.toLocaleString(undefined, { minimumFractionDigits: 2 })}€ (Últimas 2 cifras)`;
                }
            }
            if (numero.slice(-1) === numeroPremiadoItem.toString().slice(-1)) {
                mejorPremio = Math.max(mejorPremio, premioData.premioUltimaCifra);
                if (mejorPremio === premioData.premioUltimaCifra) {
                    descripcion = `${premioData.premioUltimaCifra.toLocaleString(undefined, { minimumFractionDigits: 2 })}€ (Última cifra)`;
                }
            }
        });

        if (mejorPremio > 0) {
            premioTotal += mejorPremio;
            descripciones.push(descripcion);
        }
    });

    // Ajustar el premio total a la cantidad jugada
    const premioFinal = ((premioTotal * cantidad) / 10).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // Mostrar el resultado
    resultado.innerHTML = premioTotal > 0
        ? `<br><div style="background-color: #d4edda; border-radius: 5px;">
            <p style="text-align:center; font-size: 30px;"><font color="black";>El teu premi és de: <font color="green">${premioFinal}€</font>.</font></p>
        </div></br>`
        : `<br><div style="background-color: #f8d7da; border-radius: 5px;">
            <p style="text-align:center; font-size: 30px;"><font color="black";>Aquest número no és guanyador. Més sort la pròxima vegada.</font></p>
        </div></br>`;
}
 return { mensaje, premioTotal };
}


module.exports = verificarPremio;

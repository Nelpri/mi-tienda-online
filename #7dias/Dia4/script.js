// Variables
const númeroMáximoPosible = 10;
const númeroSecreto = Math.floor(Math.random() * númeroMáximoPosible) + 1;
let númeroUsuario = 0;
let intentos = 0;
const máximosintentos = 5;

// Elementos del DOM
const userGuess = document.getElementById('userGuess');
const submitGuess = document.getElementById('submitGuess');
const message = document.getElementById('message');
const attempts = document.getElementById('attempts');
const finalMessage = document.getElementById('finalMessage');

// Función para manejar el envío del número
function checkGuess() {
    númeroUsuario = parseInt(userGuess.value);
    intentos++;

    if (númeroUsuario === númeroSecreto) {
        finalMessage.textContent = `¡Acertaste! El número era ${númeroSecreto}. Lo hiciste en ${intentos} ${intentos === 1 ? 'vez' : 'veces'}.`;
        message.textContent = ''; // Limpia el mensaje de "número mayor o menor"
        userGuess.disabled = true;
        submitGuess.disabled = true;
    } else {
        if (númeroUsuario > númeroSecreto) {
            message.textContent = 'El número secreto es menor.';
        } else {
            message.textContent = 'El número secreto es mayor.';
        }
    }

    attempts.textContent = `Intentos: ${intentos}`;

    if (intentos >= máximosintentos && númeroUsuario !== númeroSecreto) {
        finalMessage.textContent = `¡Se acabaron los intentos! El número secreto era ${númeroSecreto}.`;
        userGuess.disabled = true;
        submitGuess.disabled = true;
    }

    // Limpiar el campo después de 1.5 segundos
    setTimeout(() => userGuess.value = '', 1500);
}

// Event Listener para el botón
submitGuess.addEventListener('click', checkGuess);

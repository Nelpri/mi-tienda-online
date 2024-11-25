let stage = 1;
const messages = [];

function handleAnswer() {
    const answer = document.getElementById('answer').value.toLowerCase().trim();
    const messageContainer = document.getElementById('message-container');

    switch (stage) {
        case 1:
            if (answer === 'front-end') {
                stage = 2;
                document.getElementById('question').innerText = '¿Quieres aprender React o Vue?';
            } else if (answer === 'back-end') {
                stage = 3;
                document.getElementById('question').innerText = '¿Quieres aprender C# o Java?';
            } else {
                messageContainer.innerText = 'Por favor, elige entre "front-end" o "back-end".';
                return;
            }
            break;
        case 2:
            if (answer === 'react') {
                stage = 4;
                document.getElementById('question').innerText = '1. Especializarme en React\n2. Convertirme en Fullstack';
            } else if (answer === 'vue') {
                stage = 4;
                document.getElementById('question').innerText = '1. Especializarme en Vue\n2. Convertirme en Fullstack';
            } else {
                messageContainer.innerText = 'Por favor, elige entre "React" o "Vue".';
                return;
            }
            break;
        case 3:
            if (answer === 'c#') {
                stage = 4;
                document.getElementById('question').innerText = '1. Especializarme en C#\n2. Convertirme en Fullstack';
            } else if (answer === 'java') {
                stage = 4;
                document.getElementById('question').innerText = '1. Especializarme en Java\n2. Convertirme en Fullstack';
            } else {
                messageContainer.innerText = 'Por favor, elige entre "C#" o "Java".';
                return;
            }
            break;
        case 4:
            if (answer === '1') {
                messageContainer.innerText = '¡Genial! Ahora, por favor, ingresa las tecnologías que te gustaría aprender.';
                document.getElementById('question').innerText = '';
                stage = 5;
            } else if (answer === '2') {
                messageContainer.innerText = '¡Excelente elección para convertirte en Fullstack!';
                document.getElementById('question').innerText = '¿Qué tecnologías específicas te gustaría aprender? Escribe "ok" para finalizar.';
                stage = 6;
            } else {
                messageContainer.innerText = 'Por favor, elige entre "1" para especializarte o "2" para convertirte en Fullstack.';
                return;
            }
            break;
        case 5:
        case 6: 
            if (answer === 'ok') {
                document.getElementById('question').innerText = 'Gracias por participar. ¡Buena suerte en tu viaje de aprendizaje!';
                stage = 7; 
            } else {
                messages.push(`Te gustaría aprender ${answer}.`);
                document.getElementById('message-container').innerText = messages.join('\n');
                document.getElementById('question').innerText = '¿Hay alguna otra tecnología que te gustaría aprender? Escribe "ok" para finalizar.';
            }
            break;
    }

    // Limpiar la casilla después de 1.5 segundos
    setTimeout(function() {
        document.getElementById('answer').value = '';
    }, 1500);
}

// Lógica del carrusel de proyectos
let indiceProyecto = 0;
const proyectos = document.querySelectorAll('.proyecto');
const puntos = document.querySelectorAll('.carrusel__punto');

function mostrarProyecto(indice) {
    proyectos.forEach((proyecto, i) => {
        proyecto.style.display = i === indice ? 'block' : 'none';
    });
    actualizarPuntos(indice);
}

function actualizarPuntos(indice) {
    puntos.forEach((punto, i) => {
        punto.style.backgroundColor = i === indice ? '#74b9ff' : '#0984e3';
    });
}

document.querySelector('.carrusel__anterior').addEventListener('click', () => {
    indiceProyecto = (indiceProyecto > 0) ? indiceProyecto - 1 : proyectos.length - 1;
    mostrarProyecto(indiceProyecto);
});

document.querySelector('.carrusel__siguiente').addEventListener('click', () => {
    indiceProyecto = (indiceProyecto < proyectos.length - 1) ? indiceProyecto + 1 : 0;
    mostrarProyecto(indiceProyecto);
});

// Inicializar carrusel
mostrarProyecto(indiceProyecto);

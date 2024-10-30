const productos = [
    { id: 1, nombre: 'Crema para peinar', precio: 16000, imagen: 'imagenes/crempein.jpeg' },
    { id: 2, nombre: 'Tratamiento Nutribela', precio: 19000, imagen: 'imagenes/tratnutrib.jpeg' },
    { id: 3, nombre: 'Bálsamo Labial', precio: 8500, imagen: 'imagenes/balsmlabial.webp' },
    { id: 4, nombre: 'Desodorante Old Spice', precio: 20400, imagen: 'imagenes/desold.webp' },
    { id: 5, nombre: 'Loción Limpiadora', precio: 74000, imagen: 'imagenes/loclimpia.webp' },
    { id: 6, nombre: 'Shampoo Elvive Hialurónico', precio: 24100, imagen: 'imagenes/shamelv.webp' },
    { id: 7, nombre: 'Shampoo Old Spice', precio: 39000, imagen: 'imagenes/shamold.webp' },
];

let carrito = [];

function mostrarSeccion(seccion) {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(s => s.classList.remove('activa'));
    document.getElementById(seccion).classList.add('activa');
}

document.getElementById('btn-inicio').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarSeccion('inicio');
});

document.getElementById('btn-productos').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarSeccion('catalogo');
    cargarProductos();
});

document.getElementById('btn-carrito').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarSeccion('carrito');
    mostrarCarrito();
});

document.getElementById('btn-contacto').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarSeccion('contacto');
});

function cargarProductos() {
    const container = document.getElementById('productos-container');
    container.innerHTML = '';

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        container.appendChild(productoDiv);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);

    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(p => p.id === id);
    if (productoEnCarrito) {
        // Si el producto ya está, incrementar la cantidad
        productoEnCarrito.cantidad++;
        mostrarMensaje(`Se incrementó la cantidad de ${producto.nombre} en el carrito.`);
    } else {
        // Si no está, añadirlo al carrito con cantidad 1
        carrito.push({ ...producto, cantidad: 1 });
        mostrarMensaje(`Agregaste ${producto.nombre} al carrito!`);
    }
    mostrarCarrito();
}

function mostrarCarrito() {
    const carritoContenido = document.getElementById('carrito-contenido');
    carritoContenido.innerHTML = '';

    if (carrito.length === 0) {
        carritoContenido.innerHTML = '<p>El carrito está vacío.</p>';
        document.getElementById('total').innerText = 'Total: $0';
        return;
    }

    let total = 0;
    carrito.forEach((producto, index) => {
        total += producto.precio * producto.cantidad;
        carritoContenido.innerHTML += `
            <p>${producto.nombre} - $${producto.precio} (x${producto.cantidad}) 
                <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
            </p>`;
    });

    document.getElementById('total').innerText = `Total: $${total}`;
}

function eliminarDelCarrito(id) {
    const productoIndex = carrito.findIndex(p => p.id === id);

    if (productoIndex !== -1) {
        const producto = carrito[productoIndex];
        if (producto.cantidad > 1) {
            // Si hay más de una cantidad, reducir la cantidad
            producto.cantidad--;
            mostrarMensaje(`Se redujo la cantidad de ${producto.nombre} en el carrito.`);
        } else {
            // Si solo queda uno, eliminarlo del carrito
            carrito.splice(productoIndex, 1);
            mostrarMensaje(`Se eliminó ${producto.nombre} del carrito.`);
        }
    }
    mostrarCarrito();
}

function mostrarMensaje(mensaje) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.innerText = mensaje;
    mensajeDiv.style.display = 'block';
    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 3000);
}

function reiniciarCarrito() {
    carrito = [];
    mostrarCarrito();
    mostrarMensaje('Carrito reiniciado.');
}

// Mostrar la sección de inicio al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    mostrarSeccion('inicio');
});

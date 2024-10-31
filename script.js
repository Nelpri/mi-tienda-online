const productos = [
    { id: 1, nombre: 'Crema para peinar', precio: 16000, imagen: 'imagenes/crempein.jpeg', cantidad: 5 },
    { id: 2, nombre: 'Tratamiento Nutribela', precio: 19000, imagen: 'imagenes/tratnutrib.jpeg',  cantidad: 1 },
    { id: 3, nombre: 'Bálsamo Labial', precio: 8500, imagen: 'imagenes/balsmlabial.webp', cantidad: 5 },
    { id: 4, nombre: 'Desodorante Old Spice', precio: 20400, imagen: 'imagenes/desold.webp', cantidad: 5 },
    { id: 5, nombre: 'Loción Limpiadora', precio: 74000, imagen: 'imagenes/loclimpia.webp', cantidad: 0 },
    { id: 6, nombre: 'Shampoo Elvive Hialurónico', precio: 24100, imagen: 'imagenes/shamelv.webp', cantidad: 5 },
    { id: 7, nombre: 'Shampoo Old Spice', precio: 39000, imagen: 'imagenes/shamold.webp', cantidad: 5 },
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
        
        // Si la cantidad es 0, mostrar "Agotado"
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            ${producto.cantidad > 0 ? 
                `<button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>` : 
                `<span class="agotado">Agotado</span>`
            }
        `;
        container.appendChild(productoDiv);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);

    if (producto.cantidad === 0) {
        mostrarMensaje(`El producto ${producto.nombre} está agotado.`);
        return;
    }

    const productoEnCarrito = carrito.find(p => p.id === id);
    
    if (productoEnCarrito) {
        if (productoEnCarrito.cantidad < producto.cantidad) {
            productoEnCarrito.cantidad++;
            mostrarMensaje(`Se incrementó la cantidad de ${producto.nombre} en el carrito.`);
        } else {
            mostrarMensaje(`No hay más unidades de ${producto.nombre} disponibles.`);
        }
    } else {
        carrito.push({ ...producto, cantidad: 1 });
        mostrarMensaje(`Agregaste ${producto.nombre} al carrito!`);
    }

    mostrarCarrito();
    actualizarResumenCarrito();
}

function actualizarResumenCarrito() {
    const resumenTexto = document.getElementById('resumen-texto');
    const totalArticulos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    const totalPrecio = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

    resumenTexto.innerText = `Carrito: ${totalArticulos} artículos - Total: $${totalPrecio}`;
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
    carrito.forEach((producto) => {
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
            producto.cantidad--;
            mostrarMensaje(`Se redujo la cantidad de ${producto.nombre} en el carrito.`);
        } else {
            carrito.splice(productoIndex, 1);
            mostrarMensaje(`Se eliminó ${producto.nombre} del carrito.`);
        }
    }
    mostrarCarrito();
    actualizarResumenCarrito();
}

function mostrarMensaje(texto) {
    const mensajeContainer = document.getElementById('mensaje-container');
    mensajeContainer.innerText = texto;
    mensajeContainer.style.display = 'block';

    setTimeout(() => {
        mensajeContainer.style.display = 'none';
    }, 3000);
}

function reiniciarCarrito() {
    carrito = [];
    mostrarCarrito();
    actualizarResumenCarrito();
    mostrarMensaje('Carrito reiniciado.');
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarSeccion('inicio');
});

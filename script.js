// Datos de ejemplo de productos
const productos = [
    { id: 1, nombre: 'Crema para peinar', precio: 16000, imagen: 'imagenes/crempein.jpeg' },
    { id: 2, nombre: 'Tratamiento Nutribela', precio: 19000, imagen: 'imagenes/tratnutrib.jpeg' },
];

// Inicializar el carrito
let carrito = [];

// Función para mostrar la sección activa
function mostrarSeccion(seccion) {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(s => s.classList.remove('activa')); // Ocultamos todas las secciones
    document.getElementById(seccion).classList.add('activa'); // Mostramos la sección seleccionada
}

// Eventos de navegación
document.getElementById('btn-inicio').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarSeccion('inicio');
});

document.getElementById('btn-productos').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarSeccion('catalogo');
    cargarProductos(); // Cargar productos cuando se muestre la sección
});

document.getElementById('btn-carrito').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarSeccion('carrito');
    mostrarCarrito(); // Mostrar carrito cuando se muestre la sección
});

document.getElementById('btn-contacto').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarSeccion('contacto'); // Mostrar sección de contacto
});

// Cargar productos en la sección de catálogo
function cargarProductos() {
    const container = document.getElementById('productos-container');
    container.innerHTML = ''; // Limpiar el contenido anterior

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


// Agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push(producto);
        mostrarMensaje(`Añadido al carrito: ${producto.nombre}`);
        actualizarTotal();
    }
}

// Mostrar el carrito
function mostrarCarrito() {
    const carritoContenido = document.getElementById('carrito-contenido');
    carritoContenido.innerHTML = ''; // Limpiar contenido anterior

    if (carrito.length === 0) {
        carritoContenido.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }

    carrito.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.innerHTML = `
            <p>${producto.nombre} - $${producto.precio} 
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button></p>
        `;
        carritoContenido.appendChild(productoDiv);
    });
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    const producto = carrito.splice(index, 1)[0]; // Eliminar el producto
    mostrarMensaje(`Eliminado del carrito: ${producto.nombre}`);
    mostrarCarrito(); // Actualizar el carrito visible
    actualizarTotal(); // Actualizar total
}

// Reiniciar carrito
function reiniciarCarrito() {
    carrito = [];
    mostrarCarrito();
    actualizarTotal();
    mostrarMensaje('Carrito reiniciado.');
}

// Actualizar total del carrito
function actualizarTotal() {
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);
    document.getElementById('total').textContent = `Total: $${total}`;
}

// Mostrar mensaje
function mostrarMensaje(texto) {
    const mensaje = document.getElementById('mensaje');
    mensaje.textContent = texto;
    mensaje.style.display = 'block';
    setTimeout(() => {
        mensaje.style.display = 'none';
    }, 3000); // Mensaje desaparece después de 3 segundos
}

// Mostrar la sección de inicio al cargar
mostrarSeccion('inicio');

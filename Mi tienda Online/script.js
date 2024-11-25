let productos = [];
let carrito = [];
let mensajeTimeout; // Variable para almacenar el timeout de mensaje

// Cargar productos desde productos.json
async function cargarProductosDesdeJSON() {
    try {
        const respuesta = await fetch('productos.json');
        if (!respuesta.ok) throw new Error('Error al cargar los productos');
        
        productos = await respuesta.json();
        cargarProductos(); // Cargar productos en el catálogo una vez que se obtienen los datos
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('No se pudieron cargar los productos.');
    }
}

// Validar que los productos sean correctos
function validarProductos(productos) {
    const ids = new Set(); // Usaremos un Set para garantizar que los IDs sean únicos

    for (const producto of productos) {
        // Validar que la cantidad no sea negativa
        if (producto.cantidad < 0) {
            console.error(`El producto ${producto.nombre} tiene una cantidad negativa.`);
            return false;
        }

        // Validar que los ID sean únicos
        if (ids.has(producto.id)) {
            console.error(`El ID ${producto.id} no es único para el producto ${producto.nombre}.`);
            return false;
        }
        ids.add(producto.id);

        // Validar que todos los campos necesarios existan
        if (!producto.id || !producto.nombre || !producto.precio || !producto.imagen || !producto.caracteristicas) {
            console.error(`El producto ${producto.nombre} tiene campos incompletos.`);
            return false;
        }
    }
    return true; // Si todas las validaciones pasan
}

// Mostrar la sección seleccionada en el menú
function mostrarSeccion(seccion) {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(s => s.classList.remove('activa'));
    document.getElementById(seccion).classList.add('activa');
}

// Configuración de los botones de navegación
document.getElementById('btn-inicio').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarSeccion('inicio');
    cargarProductos(); // Recargar productos solo en la sección inicio
});

document.getElementById('btn-productos').addEventListener('click', (e) => {
    e.preventDefault();
    mostrarSeccion('catalogo');
    cargarProductosDesdeJSON(); // Cargar productos al abrir el catálogo
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

// Cargar productos en el catálogo
function cargarProductos() {
    const container = document.getElementById('productos-container');
    container.innerHTML = '';
    const seccionActiva = document.querySelector('.seccion.activa').id; // Detectar la sección activa

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        
        // Mostrar "Agotado" si el producto tiene cantidad 0
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            ${producto.cantidad > 0 ? 
                `<button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>` : 
                `<span class="agotado">Agotado</span>`
            }
        `;

        // Mostrar características solo en la sección inicio
        if (seccionActiva === 'inicio') {
            const caracteristicasDiv = document.createElement('div');
            caracteristicasDiv.classList.add('caracteristicas');
            caracteristicasDiv.innerHTML = `<p>${producto.caracteristicas}</p>`;
            productoDiv.appendChild(caracteristicasDiv);
        }
        
        container.appendChild(productoDiv);
    });
}

// Agregar un producto al carrito
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

    producto.cantidad--; // Reducir cantidad en el inventario
    cargarProductos(); // Actualizar el catálogo para mostrar "Agotado" si es necesario
    mostrarCarrito();
    actualizarResumenCarrito();
}

// Actualizar el resumen del carrito
function actualizarResumenCarrito() {
    const resumenTexto = document.getElementById('resumen-texto');
    const totalArticulos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    const totalPrecio = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);

    resumenTexto.innerText = `Carrito: ${totalArticulos} artículos - Total: $${totalPrecio}`;
}

// Mostrar los productos en el carrito
function mostrarCarrito() {
    const carritoContenido = document.getElementById('carrito-contenido');
    carritoContenido.innerHTML = '';

    if (carrito.length === 0) {
        carritoContenido.innerHTML = '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach(producto => {
            const productoCarrito = document.createElement('div');
            productoCarrito.classList.add('producto-carrito');
            productoCarrito.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Cantidad: ${producto.cantidad}</p>
                <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
            `;
            carritoContenido.appendChild(productoCarrito);
        });
    }

    const total = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    document.getElementById('total').innerText = `Total: $${total}`;
}

// Eliminar un producto del carrito (con confirmación)
function eliminarDelCarrito(id) {
    const productoEnCarrito = carrito.find(p => p.id === id);
    const productoEnInventario = productos.find(p => p.id === id);

    if (productoEnCarrito) {
        mostrarConfirmacion(
            `¿Seguro que deseas eliminar ${productoEnCarrito.nombre} del carrito?`,
            () => {
                if (productoEnCarrito.cantidad > 1) {
                    productoEnCarrito.cantidad--;
                    mostrarMensaje(`Se disminuyó la cantidad de ${productoEnCarrito.nombre} en el carrito.`);
                } else {
                    carrito = carrito.filter(p => p.id !== id);
                    mostrarMensaje(`Eliminaste ${productoEnCarrito.nombre} del carrito.`);
                }

                productoEnInventario.cantidad++;
                cargarProductos();
                mostrarCarrito();
                actualizarResumenCarrito();
            }
        );
    }
}

function mostrarConfirmacion(mensaje, accionConfirmar) {
    const confirmacionContainer = document.createElement('div');
    confirmacionContainer.className = 'confirmacion-container';

    confirmacionContainer.innerHTML = `
        <div class="confirmacion">
            <p>${mensaje}</p>
            <button id="confirmar-si" class="btn-confirmar">Sí</button>
            <button id="confirmar-no" class="btn-cancelar">No</button>
        </div>
    `;

    document.body.appendChild(confirmacionContainer);

    // Configuración de botones
    document.getElementById('confirmar-si').addEventListener('click', () => {
        accionConfirmar();
        document.body.removeChild(confirmacionContainer);
    });

    document.getElementById('confirmar-no').addEventListener('click', () => {
        document.body.removeChild(confirmacionContainer);
    });
}

// Reiniciar el carrito
function reiniciarCarrito() {
    carrito.forEach(item => {
        const productoEnInventario = productos.find(p => p.id === item.id);
        productoEnInventario.cantidad += item.cantidad; // Restablecer cantidad en inventario
    });
    
    carrito = [];
    mostrarCarrito();
    actualizarResumenCarrito();
    mostrarMensaje('El carrito ha sido vaciado.');
}

// Mostrar mensajes de notificación
function mostrarMensaje(mensaje) {
    // Si ya existe un timeout en ejecución, cancelarlo antes de mostrar el nuevo mensaje
    if (mensajeTimeout) {
        clearTimeout(mensajeTimeout);
    }

    const mensajeContainer = document.getElementById('mensaje-container');
    mensajeContainer.innerText = mensaje;
    mensajeContainer.style.display = 'block';

    // Ocultar el mensaje después de 3 segundos
    mensajeTimeout = setTimeout(() => {
        mensajeContainer.style.display = 'none';
    }, 3000);
}

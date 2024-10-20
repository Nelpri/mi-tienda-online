let carrito = [];

// Función para cargar los productos desde el archivo JSON
window.addEventListener('DOMContentLoaded', () => {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito(); // Aseguramos que el carrito se actualice al cargar la página
  }
  cargarProductos(); // Cargamos los productos
});

// Función para cargar los productos
function cargarProductos() {
  fetch('productos.json')
  .then(response => response.json())
  .then(productos => mostrarCatalogo(productos))
  .catch(error => console.error('Error al cargar los productos:', error));

}

// Función para mostrar el catálogo de productos
function mostrarCatalogo(productos) {
  const catalogo = document.getElementById('catalogo');
  catalogo.innerHTML = ''; // Aseguramos que esté limpio antes de agregar los productos
  
  productos.forEach(producto => {
    const divProducto = document.createElement('div');
    divProducto.classList.add('producto');
    divProducto.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button class="btn-carrito" data-id="${producto.id}">Añadir al carrito</button>
    `;
    catalogo.appendChild(divProducto);
  });

  // Asignar evento a los botones de "Añadir al carrito"
  const botonesCarrito = document.querySelectorAll('.btn-carrito');
  botonesCarrito.forEach(boton => {
    boton.addEventListener('click', () => {
      const productoId = boton.getAttribute('data-id');
      const productoSeleccionado = productos.find(p => p.id == productoId);
      agregarAlCarrito(productoSeleccionado);
    });
  });
}

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  alert(`${producto.nombre} ha sido añadido al carrito.`);
  actualizarCarrito();
}

// Función para actualizar el carrito
function actualizarCarrito() {
  const carritoContainer = document.getElementById('carrito-contenido');
  carritoContainer.innerHTML = ''; // Limpiamos el contenedor del carrito

  if (carrito.length === 0) {
    carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
  } else {
    carrito.forEach((item, index) => {
      const productoCarrito = document.createElement('div');
      productoCarrito.classList.add('producto-carrito');
      productoCarrito.innerHTML = `
        <p>${item.nombre} - $${item.precio}</p>
        <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
      `;
      carritoContainer.appendChild(productoCarrito);
    });
  }

  const totalContainer = document.getElementById('total');
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  totalContainer.textContent = `Total: $${total}`;
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(indice) {
  const item = document.querySelectorAll('.producto-carrito')[indice];
  item.classList.add('eliminado');
  setTimeout(() => {
    carrito.splice(indice, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
  }, 300); // Tiempo para el efecto de desaparición
}

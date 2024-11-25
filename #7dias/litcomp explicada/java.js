// Crear un objeto para almacenar los alimentos por categorías
let listaDeCompras = {
    frutas: [],
    lacteos: [],
    verduras: [],
    lonchera: [],
    licores: [],
    otros: []
};

// Variable para mantener la categoría seleccionada por el usuario
let selectedCategory = "frutas"; // Inicialmente seleccionada la categoría "frutas"

// Función para agregar un alimento a la lista
function addFood() {
    // Obtener el nombre del alimento desde el campo de entrada
    let food = document.getElementById('food-name').value;
    let category = selectedCategory; // Usar la categoría seleccionada

    // Verificar si se ingresó un nombre de alimento
    if (food !== "") {
        // Agregar el alimento a la categoría correspondiente en la lista de compras
        listaDeCompras[category].push(food);

        // Limpiar el campo de entrada después de agregar el alimento
        document.getElementById('food-name').value = "";
    } else {
        // Mostrar una alerta si no se ingresó un alimento
        alert("Por favor, ingresa el nombre del alimento.");
    }
}

// Función para cambiar la categoría seleccionada
function changeCategory() {
    // Actualizar la categoría seleccionada según lo elegido en el menú desplegable
    selectedCategory = document.getElementById('category').value;
}

// Función para mostrar la lista de compras en pantalla
function displayList() {
    // Obtener el elemento HTML donde se mostrará la lista
    let shoppingListElement = document.getElementById('shopping-list');
    shoppingListElement.innerHTML = ''; // Limpiar la lista antes de mostrar la nueva

    // Iterar sobre cada categoría en la lista de compras
    for (let category in listaDeCompras) {
        // Verificar si hay alimentos en la categoría
        if (listaDeCompras[category].length > 0) {
            // Crear un elemento de lista (li) para mostrar los alimentos de la categoría
            let li = document.createElement('li');
            li.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)}: ${listaDeCompras[category].join(', ')}`;
            shoppingListElement.appendChild(li);
        }
    }

    // Crear un botón para comenzar una nueva lista de compras
    let newListButton = document.createElement('button');
    newListButton.textContent = "Comenzar una nueva lista";
    newListButton.onclick = resetList; // Asignar la función que reinicia la lista al botón
    shoppingListElement.appendChild(newListButton); // Añadir el botón al final de la lista
}

// Función para reiniciar la lista de compras
function resetList() {
    // Reiniciar el objeto que almacena la lista de compras
    listaDeCompras = {
        frutas: [],
        lacteos: [],
        verduras: [],
        lonchera: [],
        licores: [],
        otros: []
    };

    // Limpiar la lista mostrada en pantalla
    document.getElementById('shopping-list').innerHTML = '';
    
    // Mostrar un mensaje al usuario indicando que la lista ha sido reiniciada
    alert("¡Lista reiniciada! Puedes comenzar una nueva lista.");
}

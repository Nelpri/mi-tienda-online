// Crear un objeto para almacenar los alimentos por categorías
let listaDeCompras = {
    frutas: [],
    lacteos: [],
    verduras: [],
    lonchera: [],
    licores: [],
    aseo:[],
    farmacia:[],
    casa:[],
    otros: []
};

// Mantener la categoría seleccionada
let selectedCategory = "frutas";

function changeCategory() {
    selectedCategory = document.getElementById('category').value;
}

function displayMessage(message, isError = false) {
    let messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.color = isError ? '#dc3545' : '#28a745'; // Rojo para errores, verde para éxito
}

function processAction() {
    let action = document.getElementById('action').value;
    let food = document.getElementById('food-name').value;
    let category = selectedCategory; // Usar la categoría seleccionada

    if (food !== "") {
        if (action === 'add') {
            listaDeCompras[category].push(food);
            displayMessage(`El alimento '${food}' ha sido agregado a la categoría '${category}'.`);
        } else if (action === 'remove') {
            removeFood(food);
        }
        document.getElementById('food-name').value = ""; // Limpiar campo del alimento después de agregar o eliminar
    } else {
        displayMessage("Por favor, ingresa el nombre del alimento.", true);
    }
}

function removeFood(food) {
    let found = false;
    for (let category in listaDeCompras) {
        let index = listaDeCompras[category].indexOf(food);
        if (index !== -1) {
            listaDeCompras[category].splice(index, 1);
            displayMessage(`El alimento '${food}' ha sido eliminado de la categoría '${category}'.`);
            found = true;
            displayList(); // Actualizar la lista en la interfaz
            break;
        }
    }
    if (!found) {
        displayMessage("¡No fue posible encontrar el elemento en la lista!", true);
    }
}

function displayList() {
    let shoppingListElement = document.getElementById('shopping-list');
    shoppingListElement.innerHTML = '';

    for (let category in listaDeCompras) {
        if (listaDeCompras[category].length > 0) {
            let li = document.createElement('li');
            li.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)}: ${listaDeCompras[category].join(', ')}`;
            shoppingListElement.appendChild(li);
        }
    }

    // Ofrecer opción para comenzar una nueva lista
    let newListButton = document.createElement('button');
    newListButton.textContent = "Comenzar una nueva lista";
    newListButton.onclick = resetList;
    shoppingListElement.appendChild(newListButton);
}

function resetList() {
    // Reiniciar la lista de compras
    listaDeCompras = {
        frutas: [],
        lacteos: [],
        verduras: [],
        lonchera: [],
        licores: [],
        aseo:[],
        farmacia:[],
        casa:[],
        otros: []
    };

    // Limpiar la lista mostrada en pantalla
    document.getElementById('shopping-list').innerHTML = '';
    displayMessage("¡Lista reiniciada! Puedes comenzar una nueva lista.");
}

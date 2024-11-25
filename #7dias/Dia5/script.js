let listaDeCompras = {
    frutas: [],
    lacteos: [],
    verduras: [],
    lonchera: [],
    licores: [],
    aseo: [],
    otros: []
};

// Mantener la categoría seleccionada
let selectedCategory = "frutas";

function addFood() {
    let food = document.getElementById('food-name').value;
    let category = selectedCategory; // Usar la categoría seleccionada

    if (food !== "") {
        listaDeCompras[category].push(food);

        // Limpiar campo del alimento después de agregar
        document.getElementById('food-name').value = "";
    } else {
        alert("Por favor, ingresa el nombre del alimento.");
    }
}

function changeCategory() {
    selectedCategory = document.getElementById('category').value;
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
        otros: []
    };

    // Limpiar la lista mostrada en pantalla
    document.getElementById('shopping-list').innerHTML = '';
    alert("¡Lista reiniciada! Puedes comenzar una nueva lista.");
}

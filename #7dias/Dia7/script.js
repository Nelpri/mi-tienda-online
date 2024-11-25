function performOperation(operation) {
    // Get values from input fields
    let num1 = parseFloat(document.getElementById('num1').value);
    let num2 = parseFloat(document.getElementById('num2').value);

    let result;
    // Perform the selected operation
    switch (operation) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
    }

    // Display the result
    document.getElementById('result-text').innerHTML = `Resultado: ${result}`;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "No se puede dividir por cero";
    }
    return a / b;
}

function exitCalculator() {
    // Clear inputs and result
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('result-text').innerHTML = '';
    document.getElementById('exit-message').innerHTML = 'Hasta la próxima';
}

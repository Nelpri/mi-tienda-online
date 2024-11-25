//variables
let númeroMáximoPosible = 10;
let númeroSecreto = Math.floor(Math.random()*númeroMáximoPosible)+1;
let númeroUsuario = 0;
let intentos =1;
//let palabraVeces = "vez";
let máximosintentos = 5;

while (númeroUsuario != númeroSecreto) {
    númeroUsuario = parseInt(prompt(`Me indicas un número entre 1 y ${númeroMáximoPosible} por favor:`));
    console.log(typeof(númeroUsuario));
    
    if (númeroUsuario == númeroSecreto) {
    //Acertamos, la condicion fue verdadera
        alert(`Acertaste, el número es: ${númeroUsuario}. Lo hiciste en ${intentos} ${intentos == 1 ? "vez" : "veces"}`);
    }
    else {
        if (númeroUsuario > númeroSecreto) {
            alert("El número secreto es menor");
        }
    else {
        alert("El número secreto es mayor")
    }
    //incrementamos el contaador cuando no acieerte
    //intentos = intentos + 1;
    //intentos += 1;
    intentos++;
    //palabraVeces = "veces";
    if (intentos > máximosintentos) {
        alert(`llegaste al número máximo de ${máximosintentos} intentos`);
        break;
    }
        //No se cumplio la condicion
    //alert("lo siento, no acertaste el número");
        
    }
}

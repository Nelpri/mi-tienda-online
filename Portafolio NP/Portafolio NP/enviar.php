<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST['nombre']);
    $email = htmlspecialchars($_POST['email']);
    $mensaje = htmlspecialchars($_POST['mensaje']);

    // Aquí puedes agregar la lógica para enviar el correo, por ejemplo, usando mail() o un servicio externo.
    // Para este ejemplo, simplemente se mostrará un mensaje de éxito.
    
    echo "<h1>Mensaje enviado correctamente</h1>";
    echo "<p>Nombre: $nombre</p>";
    echo "<p>Email: $email</p>";
    echo "<p>Mensaje: $mensaje</p>";
} else {
    echo "<h1>Error al enviar el mensaje</h1>";
}
?>

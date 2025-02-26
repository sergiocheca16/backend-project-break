/*
// Obtener el token de localStorage
const token = localStorage.getItem("token");
console.log(token); // Añadido para depuración

if (!token) {
    alert("Debes iniciar sesión para acceder al dashboard");
    window.location.href = "/"; // Redirigir a la página principal
} else {
    // Hacer solicitudes al servidor con el token
    fetch("/dashboard", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => response.text())
    .then((data) => {
        document.body.innerHTML = data; // Mostrar el contenido del dashboard
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("Error al cargar el dashboard");
    });
}
*/
// Importa las funciones necesarias desde Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyByBx8Uvoe_oQRYNW5pA5sZUpfO4nwW-aY",
  authDomain: "projectbreak2-d1fd0.firebaseapp.com",
  projectId: "projectbreak2-d1fd0",
  storageBucket: "projectbreak2-d1fd0.firebasestorage.app",
  messagingSenderId: "207769862215",
  appId: "1:207769862215:web:fb6e98e0c85bc067273162"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Define la función login como una arrow function
const login = async () => {
  const mensajeDiv = document.getElementById('mensaje'); // Obtén el div para mostrar errores
  mensajeDiv.textContent = ''; // Limpia mensajes anteriores

  try {
    // Obtén los valores de email y password
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validación de entrada
    if (!email || !password) {
      mensajeDiv.textContent = 'Email and password are required';
      return;
    }

    // Autentica al usuario con Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Obtén el ID token del usuario autenticado
    const idToken = await userCredential.user.getIdToken(); // usado por firebase. Esto es JWT 

    // Envía el ID token al servidor
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    const data = await response.json();

    // Redirige al dashboard si el login es exitoso
    if (data.success) {
      window.location.href = '/dashboard';
    } else {
      mensajeDiv.textContent = 'Login failed: ' + data.error;
    }
  } catch (error) {
    mensajeDiv.textContent = 'Error during login: ' + error.message;
  }
};

// Event listener para el botón de inicio de sesión
document.getElementById('loginButton').addEventListener('click', login);


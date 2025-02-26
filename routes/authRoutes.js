/*const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase");
const path = require("path"); // Añade esta línea

// Inicializar Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Intentar crear un nuevo usuario en Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            password,
        });
        // Si la creación es exitosa, responder con un mensaje y el UID del usuario
        res.status(201).json({ message: "Usuario registrado", uid: userRecord.uid });
    } catch (error) {
        // Si ocurre un error durante la creación, registrar el error y responder con un mensaje de error
        console.error("Error registrando usuario:", error);
        res.status(400).json({ message: "Error al registrar el usuario" });
    }
});

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Intentar obtener el registro del usuario por su correo electrónico
        const userRecord = await admin.auth().getUserByEmail(email);
        // Si el usuario existe, crear un token personalizado para él
        const token = await admin.auth().createCustomToken(userRecord.uid);
        // Responder con un mensaje de éxito y el token personalizado
        res.status(200).json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
        // Si ocurre un error durante el inicio de sesión, registrar el error y responder con un mensaje de error
        console.error("Error iniciando sesión:", error);
        res.status(400).json({ message: "Error al iniciar sesión" });
    }
});

// Ruta para mostrar el formulario de inicio de sesión
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/views/login.html"));
});

module.exports = router;*/
/*const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase");

// Inicializar Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const authMiddleware = async (req, res, next) => {
    const idToken = req.headers.authorization?.split("Bearer ")[1]; // Obtener el token del header
    console.log("Token recibido:", idToken); // Añadido para depuración

    if (!idToken) {
        return res.status(401).send("Acceso no autorizado. Debes iniciar sesión.");
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken); // Verificar el token
        req.user = decodedToken; // Añadir el usuario decodificado a la solicitud
        console.log("Token decodificado:", decodedToken); // Añadido para depuración
        next(); // Continuar con la siguiente función
    } catch (error) {
        console.error("Error verificando el token:", error);
        res.status(401).send("Token inválido o expirado.");
    }
};

module.exports = authMiddleware;*/


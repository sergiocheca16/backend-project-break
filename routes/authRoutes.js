// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const admin = require('firebase-admin');
require('../config/firebase'); // Asegura que Firebase ya está inicializado
const checkAuth = require('../middlewares/authMiddleware');
const auth = admin.auth();

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views', 'register.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views', 'login.html'));
});

router.get('/dashboard', checkAuth, (req, res) => {
  const mail = req.user.email;
  res.send(`
    <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard</title>
      </head>
      <body>
        <h1>Bienvenido al Dashboard ${mail}</h1>
        <form action="/logout" method="post">
          <button type="submit">Logout</button>
        </form>
      </body>
    </html>
  `);
});

router.get('/datos', checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views', 'datos.html'));
});

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    await auth.createUser({
      email,
      password
    });
    res.redirect('/login');
  } catch (error) {
    console.error('Error creating new user:', error);
    res.redirect('/register');
  }
});

router.post('/login', async (req, res) => {
  const { idToken } = req.body;

  try {
    // Verifica el ID token
    await auth.verifyIdToken(idToken);

    // Guardar el ID token en una cookie para mantener la sesión activa
    res.cookie('token', idToken, { httpOnly: true, secure: false });

    // Redirigir a la página de dashboard nueva después de iniciar sesión
    res.json({ success: true });

  } catch (error) {
    console.error('Error verifying ID token:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});


router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

module.exports = router;

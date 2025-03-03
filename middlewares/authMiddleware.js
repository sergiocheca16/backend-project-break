// Middleware para verificar el token
const admin = require('firebase-admin');

const checkAuth = (req, res, next) => {
  const auth = admin.auth();
  const idToken = req.cookies.token;

  if (!idToken) {
    return res.redirect('/login');
  }

  auth.verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken;
      next();
    })
    .catch(error => {
      console.error('Error verifying token:', error);
      res.redirect('/login');
    });
};

module.exports = checkAuth;

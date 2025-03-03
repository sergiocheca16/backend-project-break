// index.js
const express = require("express");
const app = express();
const { dbConnection } = require("./config/db");
const apiRoutes = require("./routes/apiRoutes");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const productRoutes = require("./routes/productRoutes");
const router = require('./routes/authRoutes');
const path = require("path");
const cookieParser = require('cookie-parser');

// Solo debes importar el servicio de Firebase una vez
require("./config/firebase"); // Firebase ya se inicializa en este archivo

// Configuración de Swagger
const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Tienda de Ropa",
        version: "1.0.0",
        description: "API para manejar productos en la tienda de ropa",
      },
    },
    apis: ["./routes/apiRoutes.js", "./controllers/productController.js"],  // Archivos donde se encuentran las rutas y controladores
};
  
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", productRoutes);
app.use("/", apiRoutes);
app.use("/", router);

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => console.log(`🚀 Servidor iniciado en puerto http://localhost:${PORT}`));
};

module.exports = app;
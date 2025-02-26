# Tienda de Ropa

Esta es una tienda de ropa creada con Node.js, Express y MongoDB.

## Cómo ejecutar la aplicación

1.  Clona el repositorio.
2.  Instala las dependencias: `npm install`.
3.  Crea un archivo `.env` con la variable `MONGO_URI`.
4.  Ejecuta la aplicación: `npm start`.

## Tecnologías utilizadas

-   Node.js
-   Express
-   MongoDB
-   Mongoose

## Rutas

-   `GET /`: Lista todos los productos.
-   `GET /products/:productId`: Muestra el detalle de un producto.
-   `GET /dashboard`: Muestra el dashboard de administración.
-   `GET /dashboard/new`: Muestra el formulario para crear un nuevo producto.
-   `POST /dashboard`: Crea un nuevo producto.
-   `GET /dashboard/:productId`: Muestra el detalle de un producto en el dashboard.
-   `GET /dashboard/:productId/edit`: Muestra el formulario para editar un producto.
-   `POST /dashboard/:productId`: Actualiza un producto.
-   `GET /dashboard/:productId/delete`: Elimina un producto.

## NO HE CONSEGUIDO HACER LO DEL FIREBASE
const mongoose = require("mongoose");
const Product = require("../models/Product");
const baseHtml = require("../public/baseHtml");
const getNavBar = require("../public/navbar");
const getProductCards = require("../public/productCards");
const getInicioBar = require("../public/paginaPrincipalbar");

// Mostrar todos los productos
const showProducts = async (req, res) => {
  const products = await Product.find();
  const productCards = getProductCards(products);
  const html = baseHtml("Tienda", getInicioBar() + productCards);
  res.send(html);
};

// Mostrar detalle de un producto
const showProductById = async (req, res) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).send("ID de producto inválido");
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send("Producto no encontrado");

    const productHtml = `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>${product.price}€</p>
        <a href="/products">Volver</a>
      </div>
    `;

    res.send(baseHtml(product.name, getNavBar() + productHtml));
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
};

// Mostrar formulario para nuevo producto
const showNewProduct = (req, res) => {
  const formHtml = `
    <form action="/dashboard" method="POST">
      <input type="text" name="name" placeholder="Nombre" required>
      <input type="text" name="description" placeholder="Descripción" required>
      <input type="text" name="image" placeholder="URL Imagen" required>
      <select name="category" required>
        <option value="Camisetas">Camisetas</option>
        <option value="Pantalones">Pantalones</option>
        <option value="Zapatos">Zapatos</option>
        <option value="Accesorios">Accesorios</option>
      </select>
      <select name="size" required>
        <option value="XS">XS</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XL">XL</option>
      </select>
      <input type="number" name="price" placeholder="Precio" required>
      <button type="submit">Crear</button>
    </form>
  `;
  res.send(baseHtml("Nuevo Producto", getNavBar() + formHtml));
};

// Crear un producto
const createProduct = async (req, res) => {
  const { name, description, image, category, size, price } = req.body;

  if (!name || !description || !image || !category || !size || !price) {
    return res.status(400).send("Todos los campos son requeridos");
  }

  try {
    const newProduct = await Product.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.status(400).send("Error al crear el producto");
  }
};

// Mostrar formulario de edición
const showEditProduct = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(404).send("Producto no encontrado");

  const formHtml = `
    <form action="/dashboard/${product._id}?_method=PUT" method="POST">
      <input type="text" name="name" value="${product.name}" required>
      <input type="text" name="description" value="${product.description}" required>
      <input type="text" name="image" value="${product.image}" required>
      <input type="number" name="price" value="${product.price}" required>
      <button type="submit">Actualizar</button>
    </form>
  `;
  res.send(baseHtml("Editar Producto", getNavBar() + formHtml));
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, image } = req.body;

  if (!name || !description || !price || !image) {
    return res.status(400).json({ message: "Todos los campos son necesarios" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId, 
      { name, description, price, image },
      { new: true } // Para devolver el producto actualizado
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

//Acceder a la página principal
const tiendaPaginaPrincipal = async (req, res) => {
  const products = await Product.find();
  const productCards = getProductCards(products);
  const html = baseHtml("Tienda", getInicioBar() + productCards);
  res.send(html);
};

//Mostras producto por categoria
const showProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });

    if (!products.length) {
      return res.send(baseHtml("Tienda", getInicioBar() + "<p>No hay productos en esta categoría</p>"));
    }

    const productCards = getProductCards(products);
    const html = baseHtml("Tienda", getInicioBar() + productCards);
    res.send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos");
  }
};

//Controlador de la API
// Mostrar todos los productos (API)
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos" });
  }
};

// Mostrar un producto por ID (API)
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

// Crear un producto (API)
const createProductApi = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el producto" });
  }
};

// Actualizar un producto (API)
const updateProductApi = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el producto" });
  }
};

// Eliminar un producto (API)
const deleteProductApi = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    if (!deletedProduct) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - size
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         description:
 *           type: string
 *           description: Descripción del producto
 *         image:
 *           type: string
 *           description: URL de la imagen del producto
 *         category:
 *           type: string
 *           enum: [Camisetas, Pantalones, Zapatos, Accesorios]
 *           description: Categoría del producto
 *         size:
 *           type: string
 *           enum: [XS, S, M, L, XL]
 *           description: Talla del producto
 *         price:
 *           type: number
 *           description: Precio del producto
 */

module.exports = {
  showProducts,
  showProductById,
  showNewProduct,
  createProduct,
  showEditProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  tiendaPaginaPrincipal,
  showProductsByCategory,
  createProductApi,
  updateProductApi,
  deleteProductApi,
};

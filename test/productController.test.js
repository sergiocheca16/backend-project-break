const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { dbConnection } = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const Product = require("../models/Product");

// Crear una aplicación express para las pruebas
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", productRoutes);

beforeAll(async () => {
  await dbConnection();
  // Limpiar la base de datos antes de cada prueba
  await Product.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Product Controller Tests", () => {
  
  // Test para mostrar todos los productos (showProducts)
  test("GET /products - Debería mostrar todos los productos", async () => {
    // Crear algunos productos en la base de datos
    await Product.create({
      name: "Camiseta Roja",
      description: "Camiseta de algodón",
      image: "camiseta_roja.jpg",
      category: "Camisetas",
      size: "M",
      price: 20,
    });

    await Product.create({
      name: "Pantalón Azul",
      description: "Pantalón de mezclilla",
      image: "pantalon_azul.jpg",
      category: "Pantalones",
      size: "L",
      price: 30,
    });

    const response = await request(app).get("/products");

    expect(response.status).toBe(200);
    expect(response.text).toContain("Camiseta Roja");
    expect(response.text).toContain("Pantalón Azul");
  });

  // Test para mostrar un producto por ID (showProductById)
  test("GET /products/:productId - Debería mostrar un producto por ID", async () => {
    const product = await Product.create({
      name: "Zapatos de Cuero",
      description: "Zapatos elegantes de cuero",
      image: "zapatos_cuero.jpg",
      category: "Zapatos",
      size: "M",
      price: 50,
    });

    const response = await request(app).get(`/products/${product._id}`);

    expect(response.status).toBe(200);
    expect(response.text).toContain("Zapatos de Cuero");
  });

  // Test para crear un producto (createProduct)
  test("POST /dashboard - Debería crear un nuevo producto", async () => {
    const newProduct = {
      name: "Gafas de Sol",
      description: "Gafas de sol modernas",
      image: "gafas_sol.jpg",
      category: "Accesorios",
      size: "M",
      price: 15,
    };

    const response = await request(app)
      .post("/dashboard")
      .send(newProduct);

    expect(response.status).toBe(302); // 302 es el código de redirección después de crear
    const createdProduct = await Product.findOne({ name: newProduct.name });
    expect(createdProduct).toBeTruthy();
    expect(createdProduct.name).toBe(newProduct.name);
  });

  // Test para actualizar un producto (updateProduct)
  test("PUT /dashboard/:productId - Debería actualizar un producto", async () => {
    const product = await Product.create({
      name: "Sombrero de Paja",
      description: "Sombrero de paja elegante",
      image: "sombrero_paja.jpg",
      category: "Accesorios",
      size: "L",
      price: 25,
    });

    const updatedProduct = {
      name: "Sombrero de Paja Nuevo",
      description: "Sombrero de paja renovado",
      image: "sombrero_paja_nuevo.jpg",
      category: "Accesorios",
      size: "L",
      price: 28,
    };

    const response = await request(app)
      .put(`/dashboard/${product._id}`)
      .send(updatedProduct);

    expect(response.status).toBe(302);
    const productInDb = await Product.findById(product._id);
    expect(productInDb.name).toBe(updatedProduct.name);
  });

  // Test para eliminar un producto (deleteProduct)
  test("DELETE /dashboard/:productId/delete - Debería eliminar un producto", async () => {
    const product = await Product.create({
      name: "Camisa Blanca",
      description: "Camisa blanca de manga larga",
      image: "camisa_blanca.jpg",
      category: "Camisetas",
      size: "M",
      price: 30,
    });

    const response = await request(app).delete(
      `/dashboard/${product._id}/delete`
    );

    expect(response.status).toBe(302);
    const deletedProduct = await Product.findById(product._id);
    expect(deletedProduct).toBeNull();
  });
});

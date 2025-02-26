const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  category: { type: String, enum: ["Camisetas", "Pantalones", "Zapatos", "Accesorios"], required: true },
  size: { type: String, enum: ["XS", "S", "M", "L", "XL"], required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Product", ProductSchema);
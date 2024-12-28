const mongoose = require('mongoose');

// Define el esquema de contador
const counterSchema = new mongoose.Schema({
  model: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

// Crea el modelo de contador
const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;

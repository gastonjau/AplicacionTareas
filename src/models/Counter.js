const mongoose = require('mongoose');

// Definir el esquema del contador
const counterSchema = new mongoose.Schema({
  _id: String,  // Usamos un campo _id que será el nombre del contador
  sequence_value: { type: Number, default: 0 }
});

// Crear el modelo de contador
const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
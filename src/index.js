require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware para manejar JSON
app.use(express.json());

// Puerto del servidor
const PORT = process.env.PORT || 5000;

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
  })
  .catch((error) => console.error('Error al conectar a MongoDB:', error));

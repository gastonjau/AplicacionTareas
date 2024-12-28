const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./src/models/taskRoutes');
require('dotenv').config();
const app = express();

const mongoURI = process.env.MONGO_URI;

// Conectar a MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado a MongoDB');
})
.catch((error) => {
  console.error('Error de conexión a MongoDB:', error);
});

// Middleware
app.use(bodyParser.json());

// Rutas
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
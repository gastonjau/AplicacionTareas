const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./models/taskRoutes');
require('dotenv').config();
const app = express();
const cors = require('cors');


const mongoURI = process.env.MONGO_URI;

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

app.use(cors({
  origin: 'https://aplicaciontareas-production.up.railway.app/api/tasks'  // Solo permitirá solicitudes de este dominio
}));

app.use(bodyParser.json());

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
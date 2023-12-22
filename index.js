const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

//Importar rutas
const authRoute = require('./routes/auth');

//Conectar a MongoDB
mongoose.set('strictQuery', false);

async function main() {
    await mongoose.connect(process.env.DB_URL);
    console.log('Conectado a la MongoDB');
}

main().catch(err => console.log(err));

//Middleware
app.use(express.json());

//Route Middleware
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server iniciado en port 3000'));
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();
global.__basedir = __dirname;

//Importar rutas
const apiRoute = require('./routes/api');

//Conectar a MongoDB
mongoose.set('strictQuery', false);

async function main() {
    await mongoose.connect(process.env.DB_URL);
    console.log('Conectado a la MongoDB');
}

main().catch(err => console.log(err));

//Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Route Middleware
app.use('/api', apiRoute);

app.listen(3000, () => console.log('Server iniciado en port 3000'));
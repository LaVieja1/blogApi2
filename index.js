const express = require('express');
const app = express();

//Importar rutas
const authRoute = require('./routes/auth');

//Middleware
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server iniciado en port 3000'));
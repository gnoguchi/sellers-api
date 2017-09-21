const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const vendedoresController = require('./controllers/vendedores');
const loginController = require('./controllers/login');
const clientesController = require('./controllers/clientes');
const app = express();


mongoose.connect('mongodb://localhost/vendedores')

//estamos usando json - API nao html
app.use(bodyParser.json());


app.use('/vendedores', vendedoresController);
app.use('/login', loginController);
app.use('/clientes', clientesController);


app.listen(3000, () => {
    console.log('Servidor inicialidado!')
});
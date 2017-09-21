const express = require('express');
const ClienteSchema = require('../schemas/cliente');
const expressJwt = require('express-jwt');

let router = express.Router()

//exige o token e popula o user
router.use(expressJwt({ secret: 'bolinhodechuva' }));

router.post('/', (request, response) => {
    let cliente = new ClienteSchema(request.body);
    cliente.vendedor = request.user._id;

    cliente.save((err, resultado) => {
        if (err) {
            response.status(400).send(err);
            return;
        }

        response.status(201).send(resultado);
    });

});

router.get('/', (request, response) => {
    ClienteSchema.find((err, result) => {
        response.send(result);
    })
});

router.get('/vendedor', (request, response) => {

    ClienteSchema.find({ vendedor: request.user._id }, (err, cliente) => {
        console.log('entrou');
        if (cliente) {
            response.send(cliente);
            return;
        }

        response.sendStatus(404);
    })
});



module.exports = router;
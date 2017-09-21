const express = require('express');
const VendedorSchema = require('../schemas/vendedor');
const passwordHash = require('password-hash');
const expressJwt = require('express-jwt');

let router = express.Router()


router.post('/', (request, response) => {
    let vendedor = new VendedorSchema(request.body);
    vendedor.senha = passwordHash.generate(request.body.senha);

    vendedor.save((err, resultado) => {
        if (err) {
            response.status(400).send(err);
            return;
        }

        response.status(201).send(resultado);
    });

    console.log(vendedor)
});


router.use(expressJwt({secret: 'bolinhodechuva'}));

router.get('/', (request, response) => {
    VendedorSchema.find((err, result) => {
        response.send(result);
    })
});

router.get('/um/:id', (request, response) => {


    VendedorSchema.findById(request.params.id, (err, vendedor) => {
        if (vendedor) {
            response.send(vendedor);
            return;
        }

        response.sendStatus(404);
    })
});

router.get('/:nome', (request, response) => {
    const regex = new RegExp(request.params.nome, 'i')

    VendedorSchema.find({ nome: regex }, (err, vendedor) => {
        if (vendedor) {
            response.send(vendedor);
            return;
        }

        response.sendStatus(404);
    })
});

module.exports = router;
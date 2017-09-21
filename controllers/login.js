const express = require('express');
const VendedorSchema = require('../schemas/vendedor')
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

let router = express.Router();

router.post('/', (request, response) => {
    const query = {
        email: request.body.email
    }
    VendedorSchema.findOne(query, (error, vendedor) => {
        if (vendedor && passwordHash.verify(request.body.senha, vendedor.senha)) {
            const token = jwt.sign({ _id: vendedor._id }, 'bolinhodechuva');

            response.set('Authorization', token);
            response.send(vendedor);
            return;
        }

        response.sendStatus(400);


    });
});

module.exports = router;

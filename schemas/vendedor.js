const mongoose = require('mongoose');

const VendedorSchema = mongoose.model('Vendedor', {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: String,
    senha: { type: String, required: true }
})


module.exports = VendedorSchema;
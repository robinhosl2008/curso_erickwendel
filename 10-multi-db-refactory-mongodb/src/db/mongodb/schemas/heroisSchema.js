const Mongoose = require('mongoose');

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    }
})

module.exports = Mongoose.model('herois', heroiSchema);
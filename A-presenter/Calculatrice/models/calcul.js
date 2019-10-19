const mongoose = require('../config/database');

const calculSchema = mongoose.Schema({
    number1: Number,
    number2: Number,
    operator: String,
    result: {
        type: Number,
        default: null
    },
    enabled: {
        type: Boolean,
        default: true
    }
});

const Calcul = mongoose.model('Calcul', calculSchema);

module.exports = Calcul;
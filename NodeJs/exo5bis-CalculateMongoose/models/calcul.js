const mongoose = require('../config/database');

let calculSchema = mongoose.Schema({
  number1: Number,
  number2: Number,
  operator: String,
  disabled: {type: Number, default: 0},
  result: { type :Number, default: ''}
});

let Calcul = mongoose.model('Calculs', calculSchema);

module.exports = Calcul;
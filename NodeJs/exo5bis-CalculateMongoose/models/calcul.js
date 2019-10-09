const mongoose = require('mongoose');

//with using the promise
mongoose.connect('mongodb://localhost:27017/calculate_db2',{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  //connection established successfully
  console.log('connexion...')
}).catch();{
  //catch any error during the initial connection
}

let calculSchema = mongoose.Schema({
  number1: Number,
  number2: Number,
  operator: String,
  disabled: {type: Number, default: 0},
  result: { type :Number, default: ''}
});

let Calcul = mongoose.model('Calculs', calculSchema);

module.exports = Calcul;
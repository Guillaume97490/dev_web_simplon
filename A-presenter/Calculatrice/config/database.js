const mongoose = require('mongoose');
//with using the promise
mongoose.connect('mongodb://localhost:27017/calcul2_db',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
}).then(() => {
  //connection established successfully
  console.log('connection established successfully')
}).catch();{
  //catch any error during the initial connection
};

module.exports = mongoose;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/calculate_db2',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  //connection established successfully
  console.log('database connection success')
}).catch();{
  // catch any error during the initial connection
}

module.exports = mongoose;
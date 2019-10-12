const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
//with using the promise
mongoose.connect('mongodb://localhost:27017/project_db',{
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
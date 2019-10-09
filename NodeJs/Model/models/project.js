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
}

let projectSchema = mongoose.Schema({
    number1: Number,
    number2: Number,
    text: String,
    enabled: {type: Number, default: 1}
});

let Project = mongoose.model('Project', projectSchema);


module.exports = Project;
const controller = {};
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
var ObjectId = require('mongodb').ObjectID;

// CONNECT TO COLLECTION
function connect(){
  mongo.connect(url, {useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {
  if (err) {
    console.error(err);return
  }

  db = client.db('calculate_db')
  collection = db.collection('calculate')
  });
}
var collection = connect();

  

controller.list = (req, res) => {
    // FIND ALL DOCUMENTS IN A COLLECTION
    collection.find().toArray((err, items) => {
      // console.log(items)
      res.render('list.ejs', {
        data: items,
        // errorMsg: 'Chiffre zéro ou opérateur inconue'
        });
      });
  };

  controller.save = (req, res) => {
    // console.log(req);
    var number1 = Number(req.body.number1);
    var number2 = Number(req.body.number2);
    var operator = '';

    switch (req.body.operator) {
      case '0':
          operator = '+';
          break;

      case '1':
          operator = '-';
          break;

      case '2':
          operator = '*';
          break;

      case '3':
          operator = '/';
          break;

      default:
          operator = "error";
    }

    if(number1 == 0 || number2 == 0 || operator == "error"){

      collection.find().toArray((err, items) => {
        // console.log(items)
        res.render('list.ejs', {
          data: items,
          errorMsg: 'Chiffre zéro non acceptée ou opérateur incorrect'
          });
        });
    };

      if (number1 && number2 && operator){
        // INSERT DATA INTO A COLLECTION
        collection.insertOne(
          {
            number1: number1,
            number2: number2,
            operator: operator,
            disabled: 0,
            result: ''
          },
        (err, result) => {
        })
        res.redirect("/calculate");
      }
      else {
        // console.log('erreur')
      }
  };


  controller.result = (req, res) => {
    // console.log(req.params.id)


    // FIND ONE DOCUMENT
    collection.findOne({ _id: ObjectId(req.params.id)}, (err, item) => {
      console.log(item)
      number1 = Number(item.number1);
      number2 = Number(item.number2);
      var operator = item.operator;

      if (item.disabled == '1'){
        collection.find().toArray((err, items) => {
          // console.log(items)
          res.render('list.ejs', {
            data: items,
            errorMsg: 'Cette opération a été désactiver'
            });
          });
      }

      switch (operator) {
        case '+':
            result = number1 + number2;
            break;

        case '-':
            result = number1 - number2;
            break;

        case '*':
            result = number1 * number2;
            break;

        case '/':
            result = number1 / number2;
            break;

        default:
            result = "Un probleme est survenue";
      }

      // UPDATE A DOCUMENT
      if (req.params.id){
        collection.updateOne({_id: ObjectId(req.params.id)}, {'$set': {
          result: result
        }}, (err, item) => {
          res.redirect("/calculate");
        });
      }

      else{
        // console.log('erreur')
      }

    });

  }


  controller.edit = (req, res) => {
    collection.findOne({ _id: ObjectId(req.params.id)}, (err, item) => {
      console.log(item)
      if (item.disabled == '1'){
        collection.find().toArray((err, items) => {
          // console.log(items)
          res.render('list.ejs', {
            data: items,
            errorMsg: 'Cette operation à été désactiver'
            });
          });
      }
      
      if (item){
        collection.find().toArray((err, items) => {
          // console.log(items)
          res.render('list.ejs', {
            data: items,
            dataEdit: item
          });
        });
      };
    });
  };


  controller.update = (req, res) => {
    // console.log(req);

    var number1 = Number(req.body.number1);
    var number2 = Number(req.body.number2);
    var operator = '';

    switch (req.body.operator) {
      case '0':
          operator = '+';
          break;

      case '1':
          operator = '-';
          break;

      case '2':
          operator = '*';
          break;

      case '3':
          operator = '/';
          break;

      default:
          operator = "error";
    }

    if(number1 == 0 || number2 == 0 || operator == "error"){

      collection.find().toArray((err, items) => {
        // console.log(items)
        res.render('list.ejs', {
          data: items,
          errorMsg: 'Chiffre zéro non acceptée ou opérateur incorrect'
          });
        });
    };
    
    
    if (req.body.id){
      collection.updateOne({_id: ObjectId(req.body.id)}, {'$set': {
        number1: number1,
        number2: number2,
        operator: operator,
        result: ''
      }}, (err, item) => {
        // console.log(item)
        res.redirect("/calculate");
      });
    }
    else{
      // console.log('erreur')
    }
  };


  controller.disable = (req, res) => {

    // UPDATE A DOCUMENT
    if (req.params.id){
      collection.updateOne({_id: ObjectId(req.params.id)}, {'$set': {
        disabled: 1
      }}, (err, item) => {
        res.redirect("/calculate");
      });
    }
    else{
      // console.log('erreur')
    }
  };

module.exports = controller;
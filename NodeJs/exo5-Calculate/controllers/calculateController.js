const controller = {};
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

var ObjectId = require('mongodb').ObjectID;


controller.list = (req, res) => {
    mongo.connect(url, {useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {if (err) {console.error(err);return}
  
    // CONNECT TO COLLECTION
    const db = client.db('calculate_db')
    const collection = db.collection('calculate')
  
    // FIND ALL DOCUMENTS IN A COLLECTION
    collection.find().toArray((err, items) => {
      // console.log(items)s
      res.render('list.ejs', {
        data: items
        });
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
          // console.log('test');
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
      res.redirect("/calculate");
    };

    mongo.connect(url, {useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {if (err) {console.error(err);return}
    
      // CONNECT TO COLLECTION
      const db = client.db('calculate_db')
      const collection = db.collection('calculate')
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
    })
  };


  controller.result = (req, res) => {
    // console.log(req.params.id)


    mongo.connect(url, {useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {if (err) {console.error(err);return}
      // get a collection
      const db = client.db('calculate_db')
      const collection = db.collection('calculate')

      var number1 = ''
      var number2 = ''
      var operator = ''
      var result = ''


        // FIND ONE DOCUMENT
      collection.findOne({ _id: ObjectId(req.params.id)}, (err, item) => {
        // console.log(item)
        number1 = Number(item.number1);
        number2 = Number(item.number2);
        var operator = item.operator;


        

      // console.log(operator)
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
    if (item.disabled == 1){
      res.redirect("/calculate");
    }


      // UPDATE A DOCUMENT
      if (req.params.id){
        collection.updateOne({_id: ObjectId(req.params.id)}, {'$set': {
          result: result
        }}, (err, item) => {
          // console.log(item)
          res.redirect("/calculate");
        });
      }

      else{
        // console.log('erreur')
      }

    });


  });

  }


  controller.edit = (req, res) => {
    mongo.connect(url, {useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {if (err) {console.error(err);return}
     // CONNECT TO COLLECTION
      const db = client.db('calculate_db')
      const collection = db.collection('calculate')
      // FIND ONE DOCUMENT
      collection.findOne({ _id: ObjectId(req.params.id)}, (err, item) => {
        // console.log(item)
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
    });
  };


  controller.update = (req, res) => {
    // console.log(req);

    var number1 = Number(req.body.number1);
    var number2 = Number(req.body.number2);
    var operator = '';

    switch (req.body.operator) {
      case '0':
          // console.log('test');
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
      res.redirect("/calculate");
    };
    
    mongo.connect(url, {useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {if (err) {console.error(err);return}
        // get a collection
        const db = client.db('calculate_db')
        const collection = db.collection('calculate')
        // UPDATE A DOCUMENT
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
    });
  };


  controller.disable = (req, res) => {
    // console.log(req);

    
    mongo.connect(url, {useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {if (err) {console.error(err);return}
        // get a collection
        const db = client.db('calculate_db')
        const collection = db.collection('calculate')
        // UPDATE A DOCUMENT
        if (req.params.id){
          collection.updateOne({_id: ObjectId(req.params.id)}, {'$set': {
            disabled: 1
          }}, (err, item) => {
            // console.log(item)
            res.redirect("/calculate");
          });
        }
        else{
          // console.log('erreur')
        }
    });
  };


  // controller.delete = (req, res) => {
  //   mongo.connect(url, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true
  //     }, (err, client) => {
  //     if (err) {
  //       console.error(err)
  //       return
  //     }
  //     // get a collection
  //     const db = client.db('livres_db')
  //     const collection = db.collection('livres')
  //     // DELETE A DOCUMENT
  //     collection.deleteOne({_id: ObjectId(req.params.id)}, (err, item) => {
  //       console.log(item)
  //       res.redirect("/livre");
  //     })
  //   });
  // };


module.exports = controller;
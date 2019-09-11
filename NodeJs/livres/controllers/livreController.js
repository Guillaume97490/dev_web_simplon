const controller = {};
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

var ObjectId = require('mongodb').ObjectID;

var moment = require('moment');
require('moment/locale/fr');

controller.list = (req, res) => {
  
  mongo.connect(url, {useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {if (err) {console.error(err);return}

  // CONNECT TO COLLECTION
  const db = client.db('livres_db')
  const collection = db.collection('livres')

  // FIND ALL DOCUMENTS IN A COLLECTION
  collection.find().toArray((err, items) => {
    console.log(items)
    res.render('livre.ejs', {
      data: items,
      moment: moment
      });
    });
  });
};



controller.add = (req, res) => {
  res.render('form.ejs');
};



controller.save = (req, res) => {
  mongo.connect(url, {useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {if (err) {console.error(err);return}

    // CONNECT TO COLLECTION
    const db = client.db('livres_db')
    const collection = db.collection('livres')
    if (req.body.title && moment(req.body.date).isValid()){
      // INSERT DATA INTO A COLLECTION
      collection.insertOne(
        {
          titre: req.body.title,
          date: moment(req.body.date).format('MM/DD/YYYY')
        },
      (err, result) => {
      })
      res.redirect("/livre");
    }
    else {
      console.log('erreur')
    }
  })
};



controller.edit = (req, res) => {
  mongo.connect(url, {useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {if (err) {console.error(err);return}
   // CONNECT TO COLLECTION
    const db = client.db('livres_db')
    const collection = db.collection('livres')
    // FIND ONE DOCUMENT
    collection.findOne({ _id: ObjectId(req.params.id)}, (err, item) => {
      console.log(item)
      if (item){
        res.render('form.ejs',{
          data: item,
          moment: moment,
        });
      };
    });
  });
};




controller.update = (req, res) => {
  mongo.connect(url, {useNewUrlParser: true,useUnifiedTopology: true}, (err, client) => {if (err) {console.error(err);return}
      // get a collection
      const db = client.db('livres_db')
      const collection = db.collection('livres')
      // UPDATE A DOCUMENT
      if (req.body.title && moment(req.body.date).isValid()){
        collection.updateOne({_id: ObjectId(req.params.id)}, {'$set': {
          titre: req.body.title,
          date: req.body.date
        }}, (err, item) => {
          console.log(item)
          res.redirect("/livre");
        });
      }
      else{
        console.log('erreur')
      }
  });
};



controller.delete = (req, res) => {
  mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, (err, client) => {
    if (err) {
      console.error(err)
      return
    }
    // get a collection
    const db = client.db('livres_db')
    const collection = db.collection('livres')
    // DELETE A DOCUMENT
    collection.deleteOne({_id: ObjectId(req.params.id)}, (err, item) => {
      console.log(item)
      res.redirect("/livre");
    })
  });
};


module.exports = controller;
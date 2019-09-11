const controller = {};
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

var moment = require('moment');
require('moment/locale/fr');

controller.list = (req, res) => {
  
    mongo.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, client) => {
    if (err) {
        console.error(err)
        return
    }
    // Create and get a collection
    const db = client.db('livres_db')
    const collection = db.collection('livres')


  collection.find().toArray((err, items) => {
    console.log(items)
    res.render('livre.ejs', {
      data: items,
      moment: moment
    });
    })
  })
    // req.getConnection((err, conn) => {
    //   conn.query('SELECT u.*, r.nom nom_role FROM utilisateurs u INNER JOIN roles r ON u.roleId = r.id', (err, utilisateurs, roles) => {
    //     if (err) {
    //       res.json(err);
    //     }
    //     res.render('utilisateurs', {
    //       data: utilisateurs,
    //       tada: roles
    //     });
    //   });
    // });
  };
controller.add = (req, res) => {
    res.render('form.ejs')
  };

controller.save = (req, res) => {
    // console.log(req.body.title);
    // console.log(req.body.date);
    
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
    
    if (req.body.title && moment(req.body.date).isValid()){
      // Insert data into a collection a Document
      collection.insertOne(
        {
          titre: req.body.title,
          date: moment(req.body.date).format('MM/DD/YYYY')
          // date: Date(req.body.date)
        },
      (err, result) => {
      })
      res.redirect("/livre");

    }
    else {
      console.log('error')
    }

})

  };







module.exports = controller;
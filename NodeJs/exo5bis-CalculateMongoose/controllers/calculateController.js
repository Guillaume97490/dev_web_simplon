const controller = {};

let Calcul = require('../models/calcul');

controller.list = (req, res) => {
      // get all the calculs
      Calcul.find({}, function(err, items) {
        if (err) throw err;
        // object of all the calculs
        // console.log(items);
        res.render('list.ejs', {
          data: items,
          // errorMsg: 'Chiffre zéro ou opérateur inconue'
          });
      });
      
    
  };

controller.save = (req, res) => {
  // console.log('test')
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
    // create a new calcul
    let newCalcul = Calcul({
      number1: number1,
      number2: number2,
      operator: operator,
    });
    // save the calcul
    newCalcul.save(function(err) {
      if (err) throw err;
      // console.log('Calcul created successfully.');
      res.redirect("/calculate");
    });
  }
};

controller.result = (req, res) => {
  // get one Document
Calcul.findById(req.params.id, function(err, item) {
  if (err) throw err;
  // object of the calcul
  // console.log(item);
  number1 = Number(item.number1);
  number2 = Number(item.number2);
  var operator = item.operator;

  if (item.disabled == '1'){
    Calcul.find({}, function(err, items) {
      if (err) throw err;
      // object of all the calculs
      // console.log(items);
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
    // find the calcul with id
  // update result
  Calcul.findByIdAndUpdate(req.params.id,{
    result: result
    }, 
  function(err, calcul) {
    if (err) throw err;
    res.redirect("/calculate");

  // updated calcul
  // console.log(calcul);
  });


});
}

// controller.edit = (req, res) => {
//   Calcul.findById(req.params.id, function(err, item) {
//     // console.log(item)
//     if (item.disabled == '1'){
//       Calcul.find({}, function(err, items) {
//         if (err) throw err;
//         // object of all the calculs
//         // console.log(items);
//         res.render('list.ejs', {
//           data: items,
//           errorMsg: 'Cette opération a été désactiver'
//           });
//       });
//     }
//     if (item){
//       Calcul.find({}, function(err, items) {
//         if (err) throw err;
//         // object of all the calculs
//         // console.log(items);
//         res.render('list.ejs', {
//           data: items,
//           dataEdit: item
//           });
//       });
      
//     };
//   })

// }
controller.update = (req, res) => {
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
    Calcul.findByIdAndUpdate(req.params.id,{
      number1: number1,
      number2: number2,
      operator: operator,
      result: ''
      }, 
    function(err, calcul) {
      if (err) throw err;
      res.redirect("/calculate");
  
    // updated calcul
    // console.log(calcul);
    });
  }

}
controller.disable = (req, res) => {
  if (req.params.id){
    Calcul.findByIdAndUpdate(req.params.id,{
      disabled: 1
      }, 
    function(err, calcul) {
      if (err) throw err;
      res.redirect("/calculate");
  
    // updated calcul
    // console.log(calcul);
    });
  }
}

module.exports = controller;
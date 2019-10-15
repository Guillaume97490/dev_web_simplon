const controller = {};

// importing model 
let Calcul = require('../models/calcul');

controller.index = (req, res) => {
    // get all the collection
    Calcul.find({}, function (err, items) {
        if (err) throw err;
        // console.log(items);
        res.render('./calcul/index.ejs', {
            data: items, // object of the all items
            title: 'Accueil'
        });
    });
};

// controller.show = (req, res) => {
//     Calcul.findById(req.params.id, function (err, item) {
//         if (err) throw err;
//         if (item) {

//             // console.log(item);
//             res.render('./calcul/show.ejs', {
//                 data: item, // object of one item
//                 title: item._id
//             });
//         };
//     })
// }



controller.calcul = (req, res) => {
    console.log('test');
    // get one Document
    Calcul.findById(req.params.id, function (err, item) {
        if (err) throw err;
        // object of the calcul
        // console.log(item);
        number1 = Number(item.number1);
        number2 = Number(item.number2);
        var operator = item.operator;

        if (item.disabled == '1') {
            Calcul.find({}, function (err, items) {
                if (err) throw err;
                // object of all the calculs
                // console.log(items);
                // res.render('list.ejs', {
                //     data: items,
                //     errorMsg: 'Cette opération a été désactiver'
                // });
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
                // return res.redirect("/calcul");
        }
        // find the calcul with id
        // update result
        Calcul.findByIdAndUpdate(req.params.id, {
                result: result
            },
            function (err, calcul) {
                if (err) throw err;
                // res.redirect("/calcul");
            });


    });
}

controller.add = (req, res) => {
    res.render('./calcul/form.ejs', {
        title: 'Nouveau'
    });

}


controller.save = (req, res) => {
    number1 = Number(req.body.number1);
    number2 = Number(req.body.number2);
    op = Number(req.body.operator);

    switch (op) {
        case 0:
            operator = '+';
            break
        case 1:
            operator = '-';
            break
        case 2:
            operator = '*';
            break
        case 3:
            operator = '/';
            break
        default:
            return res.redirect("/calcul")
    }

    let newCalcul = Calcul({ // create a new item
        number1: number1,
        number2: number2,
        operator: operator
    });

    newCalcul.save(function (err) { // save the new item
        if (err) throw err;
        // console.log('Calcul created successfully.');        
        res.redirect("/calcul"); // redirect to index
    });
};
controller.calcul = (req, res) => {

    // get one Document
    Calcul.findById(req.params.id, function (err, item) {
        if (err) throw err;
        // object of the calcul
        // console.log(item);
        number1 = Number(item.number1);
        number2 = Number(item.number2);
        var operator = item.operator;

        if (item.disabled == '1') {
            Calcul.find({}, function (err, items) {
                if (err) throw err;
                // object of all the calculs
                // console.log(items);
                res.redirect("/calcul");
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
                return res.redirect("/calcul");
        }
        // find the calcul with id
        // update result
        Calcul.findByIdAndUpdate(req.params.id, {
                result: result
            },
            function (err, calcul) {
                if (err) throw err;
                res.redirect("/calcul");
            });


    });

}



controller.edit = (req, res) => {
    Calcul.findById(req.params.id, function (err, item) {
        // console.log(item.enabled)
        if (item.enabled === false) {
            Calcul.find({}, function (err, items) {
                if (err) throw err;
                // console.log(items);
                return res.render('./calcul/index.ejs', {
                    data: items, // object of  the all items
                    errorMsg: 'Oups ! opération non permise',
                    title: 'Accueil'
                });

            });
        } else if (item) {
            Calcul.find({}, function (err, items) {
                if (err) throw err;
                // console.log(items);
                res.render('./calcul/form.ejs', {
                    dataEdit: item,
                    title: 'Edition de ' + item.id
                });
            });
        };
    })
}

controller.update = (req, res) => {

    Calcul.findById(req.params.id, function (err, item) {
        if (item.enabled === false) {
            Calcul.find({}, function (err, items) {
                if (err) throw err;
                // console.log(items);
                res.render('./calcul/index.ejs', {
                    data: items, // object of the all items
                    errorMsg: 'Oups ! opération non permise',
                    title: 'Accueil'
                });
            });
        } else if (req.body.id) {


            number1 = Number(req.body.number1);
            number2 = Number(req.body.number2);
            op = Number(req.body.operator);

            switch (op) {
                case 0:
                    operator = '+';
                    break
                case 1:
                    operator = '-';
                    break
                case 2:
                    operator = '*';
                    break
                case 3:
                    operator = '/';
                    break
                default:
                    return res.redirect("/calcul")
            }




            Calcul.findByIdAndUpdate(req.params.id, { // update one item with id
                    number1: number1,
                    number2: number2,
                    operator: operator,
                    result: null
                },
                function (err, item) {
                    if (err) throw err;
                    res.redirect("/calcul");
                    // console.log(item);
                });
        }
    })
}


controller.delete = (req, res) => {
    Calcul.findByIdAndRemove(req.params.id, function (err) { // find and delete the item with id 
        if (err) throw err;

        res.redirect("/calcul");
        console.log('Item deleted successfully');
    });
}


controller.disable = (req, res) => {
    if (req.params.id) {
        Calcul.findById(req.params.id, function (err, item) {
            // console.log(item)
            var enable = '';
            if (err) throw err;

            enable = !item.enabled // switch true/false
            Calcul.findByIdAndUpdate(req.params.id, { // update one item with id
                    enabled: enable
                },
                function (err, item) {
                    if (err) throw err;
                    res.redirect("/calcul");
                    // console.log(item);
                });
        })
    }
}



module.exports = controller;
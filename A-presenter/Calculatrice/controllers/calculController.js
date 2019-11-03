const controller = {};

// importing model 
const Calcul = require('../models/calcul');

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

controller.getAll = (req, res) => {
    Calcul.find({}, function (err, items) {
        if (err) throw err;
        // console.log(items);
        res.json({
            'calculs': items
        }); // renvois un json des calculs... 
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
        const operator = item.operator;

        if (item.disabled == '1') {
            Calcul.find({}, function (err, items) {
                if (err) throw err;
                return
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
                return
        }
        // find the calcul with id
        // update result
        Calcul.findByIdAndUpdate(req.params.id, {
                result: result
            },
            function (err, calcul) {
                if (err) throw err;
            });


    });
}


controller.save = (req, res) => {
    // console.log(req.body)
    const number1 = Number(req.body.number1);
    const number2 = Number(req.body.number2);
    let operator = undefined;
    if (number1 && number2) {

    }
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
            break
    }

    if (number1 && number2 && operator) {
        const newCalcul = Calcul({ // création du calcul avec les valeurs
            number1: number1,
            number2: number2,
            operator: operator
        });

        newCalcul.save(function (err) { // sauvegarde du calcul dans la base de données
            if (err) throw err;
        });
        res.end();
        
    }

};
controller.calcul = (req, res) => {
    // get one Document
    Calcul.findById(req.params.id, function (err, item) {
        if (err) throw err;
        const number1 = Number(item.number1);
        const number2 = Number(item.number2);
        const operator = item.operator;
        let result = undefined;
        if (item.disabled == '1') {
            Calcul.find({}, function (err, items) {
                if (err) throw err;
                // res.redirect("/calcul");
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
            });

        if (result) {
            res.json({
                'resultat': result
            }); // renvois un json du résultat... 
        }

    });

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
            const number1 = Number(req.body.number1);
            const number2 = Number(req.body.number2);
            const op = Number(req.body.operator);
            let operator = undefined;
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
                    // res.redirect("/calcul");

                    // console.log(item);
                });
                res.end();
        }
    })
}


controller.delete = (req, res) => {
    Calcul.findByIdAndRemove(req.params.id, function (err) { // find and delete the item with id 
        if (err) throw err;

        res.redirect("/calcul");
    });
}


controller.disable = (req, res) => {
    if (req.params.id) {
        Calcul.findById(req.params.id, function (err, item) {
            // console.log(item)
            let enable = ''; // let ici parce-que on ne peut pas redéfinir une const :) 
            if (err) throw err;

            enable = !item.enabled // switch true/false
            Calcul.findByIdAndUpdate(req.params.id, { // update one item with id
                    enabled: enable
                },
                function (err, item) {
                    if (err) throw err;
                    res.end();
                });
        })
    }
}


module.exports = controller;
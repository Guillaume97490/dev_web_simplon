const controller = {};

controller.list = (req, res) => {
    res.render('opperation.ejs');
};

controller.result = (req, res) => {
    number1 = Number(req.body.number1);
    number2 = Number(req.body.number2);

    switch (req.body.action) {
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
    
    if (!Number(result)){
        if (result == '0') {
            result = '0';
        }
        else {
            result = "Un probleme est survenue";
        }
    }
    
    res.render('opperation.ejs',{
        result: result
    });
};

module.exports = controller;
const controller = {};

// importing model 
let ProjectModel = require('../models/project');

var Project = ProjectModel.Project;


controller.index = (req, res) => {
    Project.findAll().then(items => {           // get all the table
        // console.log("All items:", JSON.stringify(items, null, 4));
        res.render('./project/index.ejs', {
            data: items,             // object of the all items
            title: 'Accueil'
        });
    });
};


controller.show = (req, res) => {
    Project.findOne({
        where: {id: req.params.id}
        }).then(item => {
        // console.log("one item:", JSON.stringify(item, null, 4));
        res.render('./project/show.ejs', {
            data: item,             // object of one item
            title: item.id
        });
    });
};


controller.add = (req, res) => {
    res.render('./project/form.ejs',{
        title: 'Nouveau'
    });
};


controller.save = (req, res) => {
    Project.create({
        number1: req.body.number1,
        number2: req.body.number2,
        text: req.body.text
    }).then(item => {
        // console.log("item's auto-generated ID:", item.id);
        res.redirect("/project");
    });
};


controller.edit = (req, res) => {
    Project.findOne({           // get one item in the table
        where: {id: req.params.id}
    }).then(item => {
        if (item.enabled === false){
            Project.findAll().then(items => {
                // console.log("All items:", JSON.stringify(items, null, 4));
                return res.render('./project/index.ejs', {
                    data: items,            // object of the all items
                    errorMsg: 'Oups ! opération non permise',
                    title: 'Accueil'
                });
            });
        }
        else if (item) {
            Project.findAll().then(items => {
                // console.log("All items:", JSON.stringify(items, null, 4));
                res.render('./project/form.ejs', {
                    dataEdit: item,
                    title: 'Edition de ' + item.id
                });
            });
        };
    });
};

controller.update = (req, res) => {

    Project.findOne({
        where: {id: req.params.id}
    }).then(item => {
        if (item.enabled === false){
            Project.findAll().then(items => {
                // console.log("All items:", JSON.stringify(items, null, 4));
                return res.render('./project/index.ejs', {
                    data: items,            // object of  the all items
                    errorMsg: 'Oups ! opération non permise',
                    title: 'Accueil'
                });
            });
        }
        else if (req.body.id){
            Project.update({            
                number1: req.body.number1,
                number2: req.body.number2,
                text: req.body.text  
            }, {
            where: {
            id: req.body.id
            }
            }).then(() => {
                console.log("Done");
                res.redirect("/project");
            });
        };
    });
};


controller.delete = (req, res) => {
    Project.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        console.log("Done");
        res.redirect("/project");
    });
};


controller.disable = (req, res) => {
    if (req.params.id){
        Project.findOne({
            where: {id: req.params.id}
        }).then(item => {
            enable = !item.enabled // switch true/false
            console.log(enable)
            Project.update({
                enabled: enable  
            }, {
            where: {
            id: req.params.id
            }
            }).then(() => {
                console.log("Done");
                res.redirect("/project");
            });
        });
    };
};


module.exports = controller;
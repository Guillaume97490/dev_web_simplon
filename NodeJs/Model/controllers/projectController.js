const controller = {};

// importing model 
let Project = require('../models/project');

controller.index = (req, res) => {
    // get all the collection
    Project.find({}, function(err, items) {
      if (err) throw err;
      // console.log(items);
      res.render('./project/index.ejs', {
        data: items,  // object of the all items
        title: 'Accueil'
        });
    });
};

controller.show = (req, res) => {
    Project.findById(req.params.id, function(err, item) {
        if (err) throw err;
        if (item){ 
            
            // console.log(item);
            res.render('./project/show.ejs', {
                data: item, // object of one item
                title: item._id
            });
        };
    })
}

controller.add = (req, res) => {
    res.render('./project/form.ejs',{
        title: 'Nouveau'
    });

}


controller.save = (req, res) => {
   
    let newProject = Project({ // create a new item
        number1: req.body.number1,
        number2: req.body.number2,
        text: req.body.text
    });
   
    newProject.save(function(err) { // save the new item
        if (err) throw err;
        // console.log('Project created successfully.');        
        res.redirect("/project"); // redirect to index
    });
};

  
controller.edit = (req, res) => {
    Project.findById(req.params.id, function(err, item) {
        console.log(item.enabled)
        if (item.enabled === false){
            Project.find({}, function(err, items) {
                if (err) throw err;
                // console.log(items);
                return res.render('./project/index.ejs', {
                    data: items,  // object of  the all items
                    errorMsg: 'Oups ! opération non permise',
                    title: 'Accueil'
                });
                
            });
        }
        else if (item){
            Project.find({}, function(err, items) {
              if (err) throw err;
              // console.log(items);
                res.render('./project/form.ejs', {
                    dataEdit: item,
                    title: 'Edition de ' + item.id
                });
            });
        };
    })
}

controller.update = (req, res) => {
    Project.findById(req.params.id, function(err, item) {
        if (item.enabled === false){
            Project.find({}, function(err, items) {
                if (err) throw err;
                // console.log(items);
                res.render('./project/index.ejs', {
                    data: items, // object of the all items
                    errorMsg: 'Oups ! opération non permise',
                    title: 'Accueil'
                });
            });
        }
        else if (req.body.id){
            Project.findByIdAndUpdate(req.params.id,{ // update one item with id
                number1: req.body.number1,
                number2: req.body.number2,
                text: req.body.text
            }, 
            function(err, item) {
                if (err) throw err;
                res.redirect("/project");
                // console.log(item);
            });
        }
    })
}


controller.delete = (req, res) => { 
    Project.findByIdAndRemove(req.params.id, function(err) { // find and delete the item with id 
    if (err) throw err;

    res.redirect("/project");
    console.log('Item deleted successfully');
    });
}


controller.disable = (req, res) => {
    if (req.params.id){
        Project.findById(req.params.id, function(err, item) {
            // console.log(item)
            var enable = '';
            if (err) throw err;
            
            enable = !item.enabled // switch true/false
            Project.findByIdAndUpdate(req.params.id,{ // update one item with id
                enabled: enable
            },
            function(err, item) {
                if (err) throw err;
                res.redirect("/project");
            // console.log(item);
            });
        })
    }
}


module.exports = controller;
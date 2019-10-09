const controller = {};

// importing model 
let Project = require('../models/project');

controller.index = (req, res) => {
    // get all the collection
    Project.find({}, function(err, items) {
      if (err) throw err;
      // object of all the items
      // console.log(items);
      res.render('./project/index.ejs', {
        data: items
        });
    });
};

controller.show = (req, res) => {
    Project.findById(req.params.id, function(err, item) {
        // console.log(item)
        if (err) throw err;
        if (item){
            // object of item
            // console.log(item);
            res.render('./project/show.ejs', {
                data: item
            });
        };
    })
}

controller.add = (req, res) => {
    res.render('./project/form.ejs');

}


controller.save = (req, res) => {
    // create a new item
    console.log(req.body)
    let newProject = Project({
        number1: req.body.number1,
        number2: req.body.number2,
        text: req.body.text
    });
    // save the item
    newProject.save(function(err) {
        if (err) throw err;
        // console.log('Project created successfully.');

        // redirect to index
        res.redirect("/project");
    });
};

  
controller.edit = (req, res) => {
    Project.findById(req.params.id, function(err, item) {
        if (item.enabled == '0'){
            Project.find({}, function(err, items) {
                if (err) throw err;
                // object of all the items
                // console.log(items);
                res.render('./project/index.ejs', {
                    data: items,
                    errorMsg: 'Oups ! opération non permise'
                });
            });
        }
        if (item){
            Project.find({}, function(err, items) {
              if (err) throw err;
              // object of all the items
              // console.log(items);
                res.render('./project/form.ejs', {
                    dataEdit: item
                });
            });
        };
    })
}

controller.update = (req, res) => {
    Project.findById(req.params.id, function(err, item) {
        if (item.enabled == '0'){
            Project.find({}, function(err, items) {
                if (err) throw err;
                // object of all the items
                // console.log(items);
                res.render('./project/index.ejs', {
                    data: items,
                    errorMsg: 'Oups ! opération non permise'
                });
            });
        }
    })
    if (req.body.id){
        Project.findByIdAndUpdate(req.params.id,{
            number1: req.body.number1,
            number2: req.body.number2,
            text: req.body.text
        }, 
        function(err, item) {
            if (err) throw err;
            res.redirect("/project");
        
            // updated item
            // console.log(item);
        });
    }
}


controller.delete = (req, res) => {
    // find and delete the item with id 
    User.findByIdAndRemove(req.params.id, function(err) {
    if (err) throw err;

    res.redirect("/index");

    // we have deleted the user
    console.log('User deleted successfully');
    });
}


controller.disable = (req, res) => {
    if (req.params.id){
        Project.findById(req.params.id, function(err, item) {
            // console.log(item)
            var enable = '';
            if (err) throw err;
                if(item.enabled == 1){
                    enable = 0
                }
                else{
                    enable = 1
                }
            
                Project.findByIdAndUpdate(req.params.id,{
                    enabled: enable
                }, 
                function(err, calcul) {
                    if (err) throw err;
                    res.redirect("/project");
            
                // updated calcul
                // console.log(calcul);
                });
        })
    }
  }


module.exports = controller;
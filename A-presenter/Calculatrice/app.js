// Requires 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// importing routes
const calculRoutes = require('./routes/calcul');
const technoRoutes = require('./routes/techno')


// Body parser 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/public'));

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// routes
app.use('/calcul', calculRoutes);
app.use('/technologie', technoRoutes);


// Erreur 404
app.use(function(req,res){
    res.status(404).render('404');
});

// settings
app.set('port', process.env.PORT || 3000);

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
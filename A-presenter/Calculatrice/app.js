const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Body parser 
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


// importing routes
const calculRoutes = require('./routes/calcul');
const technoRoutes = require('./routes/techno')


// settings
app.set('port', process.env.PORT || 3000);

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
app.use('/calcul', calculRoutes);
app.use('/technologie', technoRoutes);

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
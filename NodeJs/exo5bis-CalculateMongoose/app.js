const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser());

// importing routes
const calculateRoutes = require('./routes/calculate');

// settings
app.set('port', process.env.PORT || 3003);
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
app.use('/calculate', calculateRoutes);

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
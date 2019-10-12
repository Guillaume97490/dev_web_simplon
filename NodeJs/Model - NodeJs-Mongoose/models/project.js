const mongoose = require('../config/database');

let projectSchema = mongoose.Schema({
    number1: Number,
    number2: Number,
    text: String,
    enabled: {type: Boolean, default: true}
});

let Project = mongoose.model('Project', projectSchema);

module.exports = Project;
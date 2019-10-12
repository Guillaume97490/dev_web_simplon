var Sequelize = require('sequelize');
var db = require('../config/database');

const Project = db.define('project', {
    // attributes
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    number1: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    number2: {
      type: Sequelize.FLOAT,
      allowNull:false,
      // allowNull defaults to true
    },
    text: {
      type:Sequelize.STRING,
      allowNull:false,
    },
    enabled:{
    type:Sequelize.BOOLEAN,
    defaultValue: true
    }
 } ,{db, tableName:"project",timestamps: false});

//  var exports = module.exports = {};
//  exports.Project = Project;

 module.exports.Project = Project;

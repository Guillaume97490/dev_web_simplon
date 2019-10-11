var Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:pass@localhost:3306/project_db');



const Project = sequelize.define('project', {
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
 } ,{sequelize, tableName:"project",timestamps: false});

 var exports = module.exports = {};
 exports.Project = Project;

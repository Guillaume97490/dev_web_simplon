var Sequelize = require('sequelize');
const db = new Sequelize('mysql://root:user@localhost:3306/project_db');

module.exports = db;
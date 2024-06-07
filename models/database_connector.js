const { Sequelize } = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(
    process.env.DBNAME, process.env.DBUSER,
    process.env.DBPASSWD, {
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        dialect: 'mysql'
    }
);

module.exports = sequelize;
require('dotenv').config();
const { Sequelize } = require('sequelize');
console.log("DB Settings:", process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST, process.env.DB_DIALECT);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

module.exports = sequelize;


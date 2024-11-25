const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('honey_management', 'kate', 'sherilpuw2004KAte', {
    host: 'localhost',
    dialect: 'mysql', // або 'postgres', залежно від вашої бази
});

module.exports = sequelize;
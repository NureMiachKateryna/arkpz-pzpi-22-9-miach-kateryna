const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('Пасічник', 'Робітник складу'),
        allowNull: false
    },
    contact_info: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'user',
    timestamps: false
});

module.exports = User;

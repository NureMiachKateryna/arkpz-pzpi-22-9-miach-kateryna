const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Report = sequelize.define('Report', {
    creation_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    }
}, {
    tableName: 'report',
    timestamps: false
});

module.exports = Report;

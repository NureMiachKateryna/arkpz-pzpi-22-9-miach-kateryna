const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sensor = sequelize.define('Sensor', {
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_reading: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'sensor',
    timestamps: false
});

module.exports = Sensor;

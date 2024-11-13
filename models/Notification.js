const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sensor = require('./Sensor');

const Notification = sequelize.define('Notification', {
    event_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    event_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
    },
    sensor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'sensor',
            key: 'id'
        }
    }
}, {
    tableName: 'notification',
    timestamps: false
});

module.exports = Notification;

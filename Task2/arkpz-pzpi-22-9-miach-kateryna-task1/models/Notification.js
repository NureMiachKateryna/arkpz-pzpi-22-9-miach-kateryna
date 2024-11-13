const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Sensor = require('./Sensor');
const User_Notification = require('../models/User_Notification');

const Notification = sequelize.define('Notification', {
    event_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[1, 2, 3]]
        }
    },
    event_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
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

Notification.EVENT_TYPES = {
    TEMPERATURE_INCREASE: 1,
    TEMPERATURE_DECREASE: 2,
    NORMAL_STATE: 3
};

module.exports = Notification;

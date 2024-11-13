const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Notification = require('./Notification');

const User_Notification = sequelize.define('User_Notification', {
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    notification_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'notification',
            key: 'id'
        }
    }
}, {
    tableName: 'user_notification',
    timestamps: false
});

module.exports = User_Notification;

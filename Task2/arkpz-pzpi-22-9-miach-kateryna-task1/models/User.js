const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isIn: [[1, 2]]
        }
    },
    contact_info: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'user',
    timestamps: false
});

User.ROLES = {
    PASICHNIK: 1,
    WAREHOUSE_WORKER: 2
};

User.isPasichnik = (role) => role === User.ROLES.PASICHNIK;
User.isWarehouseWorker = (role) => role === User.ROLES.WAREHOUSE_WORKER;

module.exports = User;

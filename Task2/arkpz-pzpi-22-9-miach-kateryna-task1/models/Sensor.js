const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Sensor = sequelize.define(
    "Sensor",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Location cannot be empty",
                },
            },
        },
        temperature: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        fullness: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        last_reading: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "sensor",
        timestamps: false,
    }
);

module.exports = Sensor;


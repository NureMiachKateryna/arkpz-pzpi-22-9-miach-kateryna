const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Honey = sequelize.define('Honey', {
    volume: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    temperature: {
        type: DataTypes.DECIMAL,
    },
    fill_level: {
        type: DataTypes.DECIMAL,
    },
    last_updated: {
        type: DataTypes.DATE,
    },
    sensor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'sensor',
            key: 'id'
        }
    }
}, {
    tableName: 'honey',
    timestamps: false
});

module.exports = Honey;

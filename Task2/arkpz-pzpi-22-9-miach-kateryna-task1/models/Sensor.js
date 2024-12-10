const Sensor = sequelize.define(
    "Sensor",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[1, 2]],
                    msg: "Type must be either 1 or 2",
                },
            },
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
        },
        humidity: {
            type: DataTypes.FLOAT,
        },
        last_reading: {
            type: DataTypes.DATE,
        },
    },
    {
        tableName: "sensors",
        timestamps: false,
    }
);

module.exports = Sensor;

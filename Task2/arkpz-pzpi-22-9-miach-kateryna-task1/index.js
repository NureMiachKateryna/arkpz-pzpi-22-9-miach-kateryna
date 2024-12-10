const express = require('express');
const sequelize = require('./config/database');
const sensorRoutes = require("./routes/sensorRoutes");
const honeyRoutes = require("./routes/honeyRoutes");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const reportRoutes = require("./routes/reportRoutes");
const mockUser = require('./middleware/mockUser'); // Імпортуємо mockUser

const app = express();
app.use(express.json());

// Додаємо mockUser перед підключенням маршрутів
app.use(mockUser); // Додає req.user до кожного запиту

// Підключення маршрутів
app.use("/api/sensor", sensorRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/honey", honeyRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/user", userRoutes);


sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

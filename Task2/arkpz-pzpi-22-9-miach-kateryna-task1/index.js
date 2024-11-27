const express = require('express');
const sequelize = require('./config/database');
const honeyRoutes = require('./routes/honeyRoutes');
const settingsRoutes = require('./routes/settings');
const mockUser = require('./middleware/mockUser'); // Імпортуємо mockUser
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
app.use(express.json());

// Додаємо mockUser перед підключенням маршрутів
app.use(mockUser); // Додає req.user до кожного запиту

// Підключення маршрутів
app.use('/api', honeyRoutes);
app.use('/api', settingsRoutes);
app.use('/api', notificationRoutes);


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

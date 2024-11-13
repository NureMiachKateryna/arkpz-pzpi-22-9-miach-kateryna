const express = require('express');
const sequelize = require('./config/database');
const honeyRoutes = require('./routes/honeyRoutes');

const app = express();
app.use(express.json());

// Підключення маршрутів
app.use('/api', honeyRoutes);

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

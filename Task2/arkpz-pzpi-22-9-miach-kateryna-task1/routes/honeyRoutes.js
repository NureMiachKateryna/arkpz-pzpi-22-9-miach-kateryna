const express = require('express');
const router = express.Router();

// Імпорт моделей
const checkRole = require('../middleware/checkRole');
const Sensor = require('../models/Sensor');
const Honey = require('../models/Honey');
const User = require('../models/User');
const Notification = require('../models/Notification');
const Report = require('../models/Report');
const User_Notification = require('../models/User_Notification');

// *** Маршрути для моделі Sensor ***

// Отримати всі сенсори
router.get('/sensor', async (req, res) => {
    try {
        const sensors = await Sensor.findAll();
        res.json(sensors);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Створити новий сенсор
router.post('/sensor', async (req, res) => {
    try {
        const sensor = await Sensor.create(req.body);
        res.status(201).json(sensor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create sensor' });
    }
});

// Оновити сенсор
router.put('/sensor/:id', async (req, res) => {
    try {
        const sensor = await Sensor.findByPk(req.params.id);
        if (!sensor) {
            return res.status(404).json({ error: 'Sensor not found' });
        }
        await sensor.update(req.body);
        res.json(sensor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update sensor' });
    }
});

// Видалити сенсор
router.delete('/sensor/:id', async (req, res) => {
    try {
        const sensor = await Sensor.findByPk(req.params.id);
        if (!sensor) {
            return res.status(404).json({ error: 'Sensor not found' });
        }
        await sensor.destroy();
        res.json({ message: 'Sensor deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete sensor' });
    }
});

// *** Маршрути для моделі Honey ***

// Отримати всі записи меду
router.get('/honey', async (req, res) => {
    try {
        const honeyRecords = await Honey.findAll();
        res.json(honeyRecords);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Створити запис меду
router.post('/honey', async (req, res) => {
    try {
        const honey = await Honey.create(req.body);
        res.status(201).json(honey);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create honey record' });
    }
});

// Оновити запис меду
router.put('/honey/:id', async (req, res) => {
    try {
        const honey = await Honey.findByPk(req.params.id);
        if (!honey) {
            return res.status(404).json({ error: 'Honey record not found' });
        }
        await honey.update(req.body);
        res.json(honey);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update honey record' });
    }
});

// Видалити запис меду
router.delete('/honey/:id', async (req, res) => {
    try {
        const honey = await Honey.findByPk(req.params.id);
        if (!honey) {
            return res.status(404).json({ error: 'Honey record not found' });
        }
        await honey.destroy();
        res.json({ message: 'Honey record deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete honey record' });
    }
});

// *** Маршрути для моделі User ***

// Отримати всіх користувачів (тільки для Пасічника)
router.get('/users', checkRole(User.ROLES.PASICHNIK), async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Помилка при отриманні користувачів' });
    }
});

// Створити користувача (тільки для Пасічника)
router.post('/user', checkRole(User.ROLES.PASICHNIK), async (req, res) => {
    try {
        const { name, role, contact_info } = req.body;
        const newUser = await User.create({ name, role, contact_info });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Помилка при створенні користувача' });
    }
});

// Оновити користувача 
router.put('/user/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        // Перевірка, чи існує користувач
        if (!user) {
            return res.status(404).json({ error: 'Користувача не знайдено' });
        }

        // Логіка доступу для оновлення
        if (req.user.role === User.ROLES.WAREHOUSE_WORKER && req.user.id !== user.id) {
            return res.status(403).json({ error: 'Робітник складу може змінювати лише свої дані' });
        }

        // Оновлення даних
        await user.update(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Помилка при оновленні користувача' });
    }
});

// Видалити користувача (тільки для Пасічника)
router.delete('/user/:id', checkRole(User.ROLES.PASICHNIK), async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Користувача не знайдено' });
        }
        await user.destroy();
        res.json({ message: 'Користувача успішно видалено' });
    } catch (error) {
        res.status(500).json({ error: 'Помилка при видаленні користувача' });
    }
});

// Отримати всі сповіщення
router.get('/notification', async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});


// Оновити сповіщення
router.put('/notification/:id', async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        await notification.update(req.body);
        res.json(notification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update notification' });
    }
});

// Видалити сповіщення
router.delete('/notification/:id', async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        }
        await notification.destroy();
        res.json({ message: 'Notification deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete notification' });
    }
});

// *** Маршрути для моделі Report ***

// Отримати всі звіти
router.get('/report', async (req, res) => {
    try {
        const reports = await Report.findAll();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Створити новий звіт
router.post('/report', async (req, res) => {
    try {
        const report = await Report.create(req.body);
        res.status(201).json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create report' });
    }
});

// Оновити звіт
router.put('/report/:id', async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.id);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        await report.update(req.body);
        res.json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update report' });
    }
});

// Видалити звіт
router.delete('/report/:id', async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.id);
        if (!report) {
            return res.status(404).json({ error: 'Report not found' });
        }
        await report.destroy();
        res.json({ message: 'Report deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete report' });
    }
});

// *** Маршрути для моделі UserNotification ***

// Отримати всі зв'язки між користувачами та сповіщеннями
router.get('/user_notification', async (req, res) => {
    try {
        const userNotifications = await UserNotification.findAll();
        res.json(userNotifications);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Створити новий запис для UserNotification
router.post('/user_notification', async (req, res) => {
    try {
        const userNotification = await UserNotification.create(req.body);
        res.status(201).json(userNotification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user notification' });
    }
});

// Оновити запис для UserNotification
router.put('/user_notification/:id', async (req, res) => {
    try {
        const userNotification = await UserNotification.findByPk(req.params.id);
        if (!userNotification) {
            return res.status(404).json({ error: 'UserNotification not found' });
        }
        await userNotification.update(req.body);
        res.json(userNotification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update user notification' });
    }
});

// Видалити запис для UserNotification
router.delete('/user_notification/:id', async (req, res) => {
    try {
        const userNotification = await UserNotification.findByPk(req.params.id);
        if (!userNotification) {
            return res.status(404).json({ error: 'UserNotification not found' });
        }
        await userNotification.destroy();
        res.json({ message: 'User notification deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user notification' });
    }
});

module.exports = router;
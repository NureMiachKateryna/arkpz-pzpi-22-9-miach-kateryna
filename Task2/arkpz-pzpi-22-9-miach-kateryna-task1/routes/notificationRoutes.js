const express = require('express');
const NotificationController = require('../controllers/NotificationController');

const router = express.Router();
const notificationController = new NotificationController();

router.use('/notification', (req, res, next) => {
    if (req.body.event_time) {
        req.body.event_time = new Date(req.body.event_time * 1000);
    }
    next();
});

router.post('/notification', async (req, res) => {
    try {
        await notificationController.createNotification(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Failed to create notification' });
    }
});

module.exports = router;

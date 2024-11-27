const express = require('express');
const NotificationController = require('../controllers/NotificationController');

const router = express.Router();
const notificationController = new NotificationController();

router.post('/notification', (req, res) => notificationController.createNotification(req, res));

module.exports = router;
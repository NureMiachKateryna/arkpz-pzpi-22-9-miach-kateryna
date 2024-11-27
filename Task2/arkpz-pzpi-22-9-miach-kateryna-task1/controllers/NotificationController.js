const NotificationService = require('../services/NotificationService');

class NotificationController {
    constructor() {
        this.notificationService = new NotificationService();
    }

    //метод для створення повідомлення
    async createNotification(req, res) {
        try {
            const { event_type, event_time, description, sensor_id } = req.body;

            const eventTime = new Date(event_time * 1000);
            const notificationData = { event_type, event_time: eventTime, description, sensor_id };

            const notification = await this.notificationService.createNotification(notificationData);
            res.status(201).json(notification);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create notification' });
        }
    }

}

module.exports = NotificationController;
const NotificationService = require('../services/NotificationService');

class NotificationController {
    constructor() {
        this.notificationService = new NotificationService();
    }

    // Метод для створення повідомлення
    async createNotification(req, res) {
        const { event_type, event_time, description, sensor_id } = req.body;

        const notification = await this.notificationService.createNotification({
            event_type,
            event_time,
            description,
            sensor_id,
        });

        res.status(201).json(notification);
    }
}

module.exports = NotificationController;

const Notification = require('../models/Notification');

class NotificationObject {
    async saveToDatabase(notificationData) {
        try {
            return await Notification.create(notificationData);
        } catch (error) {
            console.error('Error saving notification to database:', error);
            throw error;
        }
    }
}

module.exports = NotificationObject;
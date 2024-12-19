const NotificationObject = require('../objects/NotificationObject');

class NotificationService {
    constructor() {
        this.notificationObject = new NotificationObject();
    }

    async createNotification(notificationData) {
        return await this.notificationObject.saveToDatabase(notificationData);
    }
}

module.exports = NotificationService;
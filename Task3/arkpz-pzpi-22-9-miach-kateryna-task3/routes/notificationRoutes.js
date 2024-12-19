const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");

// Отримати всі сповіщення
router.get("/notification", async (req, res) => {
    try {
        const notifications = await Notification.findAll();
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

// Оновити сповіщення
router.put("/notification/:id", async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        await notification.update(req.body);
        res.json(notification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update notification" });
    }
});

// Видалити сповіщення
router.delete("/notification/:id", async (req, res) => {
    try {
        const notification = await Notification.findByPk(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }
        await notification.destroy();
        res.json({ message: "Notification deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete notification" });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const checkRole = require("../middleware/checkRole");

// Отримати всіх користувачів (тільки для Пасічника)
router.get("/users", checkRole(User.ROLES.PASICHNIK), async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Помилка при отриманні користувачів" });
    }
});

// Створити користувача (тільки для Пасічника)
router.post("/user", checkRole(User.ROLES.PASICHNIK), async (req, res) => {
    try {
        const { name, role, contact_info } = req.body;
        const newUser = await User.create({ name, role, contact_info });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Помилка при створенні користувача" });
    }
});

// Оновити користувача
router.put("/user/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        // Перевірка, чи існує користувач
        if (!user) {
            return res.status(404).json({ error: "Користувача не знайдено" });
        }

        // Логіка доступу для оновлення
        if (req.user.role === User.ROLES.WAREHOUSE_WORKER && req.user.id !== user.id) {
            return res.status(403).json({ error: "Робітник складу може змінювати лише свої дані" });
        }

        // Оновлення даних
        await user.update(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Помилка при оновленні користувача" });
    }
});

// Видалити користувача (тільки для Пасічника)
router.delete("/user/:id", checkRole(User.ROLES.PASICHNIK), async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "Користувача не знайдено" });
        }
        await user.destroy();
        res.json({ message: "Користувача успішно видалено" });
    } catch (error) {
        res.status(500).json({ error: "Помилка при видаленні користувача" });
    }
});

module.exports = router;

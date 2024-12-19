const express = require("express");
const router = express.Router();
const User = require("../models/User");
const checkRole = require("../middleware/checkRole");

// Отримати всіх користувачів (тільки для Пасічника)
router.get("/", checkRole(User.ROLES.PASICHNIK), async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

// Створити нового користувача (тільки для Пасічника)
router.post("/", checkRole(User.ROLES.PASICHNIK), async (req, res) => {
    try {
        const { name, role, contact_info } = req.body;

        // Проверка на допустимые значения
        if (!name || name.trim() === "") {
            return res.status(400).json({ error: "Name is required and cannot be empty" });
        }
        if (role !== 1 && role !== 2) {
            return res.status(400).json({ error: "Invalid role, must be 1 (Pasichnik) or 2 (Warehouse Worker)" });
        }

        const user = await User.create({
            name,
            role,
            contact_info,
        });

        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
});

// Оновити користувача
router.put("/:id", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Перевірка на доступ для оновлення: робітник може оновлювати лише свої дані
        if (req.user.role === User.ROLES.WAREHOUSE_WORKER && req.user.id !== user.id) {
            return res.status(403).json({ error: "You can only update your own data" });
        }

        const { name, role, contact_info } = req.body;

        // Обновление данных пользователя
        await user.update({
            name: name !== undefined ? name : user.name,
            role: role !== undefined ? role : user.role,
            contact_info: contact_info !== undefined ? contact_info : user.contact_info,
        });

        res.json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Failed to update user" });
    }
});

// Видалити користувача (тільки для Пасічника)
router.delete("/:id", checkRole(User.ROLES.PASICHNIK), async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await user.destroy();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Failed to delete user" });
    }
});

module.exports = router;

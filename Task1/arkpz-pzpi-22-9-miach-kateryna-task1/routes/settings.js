const express = require('express');
const router = express.Router();
const checkRole = require('../middleware/checkRole');
const User = require('../models/User');

// Налаштування для Пасічника
router.post('/settings', checkRole(User.ROLES.PASICHNIK), async (req, res) => {
    try {
        // Логіка для оновлення налаштувань
        res.json({ message: 'Налаштування оновлено' });
    } catch (error) {
        res.status(500).json({ error: 'Помилка при оновленні налаштувань' });
    }
});

module.exports = router;

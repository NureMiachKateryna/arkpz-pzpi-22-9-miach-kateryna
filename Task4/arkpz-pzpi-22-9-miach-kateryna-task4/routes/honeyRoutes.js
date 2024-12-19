const express = require('express');
const router = express.Router();
const Honey = require('../models/Honey');

// *** Маршрути для моделі Honey ***

// Отримати всі записи меду
router.get('/honey', async (req, res) => {
    try {
        const honeyRecords = await Honey.findAll();
        res.json(honeyRecords);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Створити запис меду
router.post('/honey', async (req, res) => {
    try {
        const honey = await Honey.create(req.body);
        res.status(201).json(honey);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create honey record' });
    }
});

// Оновити запис меду
router.put('/honey/:id', async (req, res) => {
    try {
        const honey = await Honey.findByPk(req.params.id);
        if (!honey) {
            return res.status(404).json({ error: 'Honey record not found' });
        }
        await honey.update(req.body);
        res.json(honey);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update honey record' });
    }
});

// Видалити запис меду
router.delete('/honey/:id', async (req, res) => {
    try {
        const honey = await Honey.findByPk(req.params.id);
        if (!honey) {
            return res.status(404).json({ error: 'Honey record not found' });
        }
        await honey.destroy();
        res.json({ message: 'Honey record deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete honey record' });
    }
});

module.exports = router;

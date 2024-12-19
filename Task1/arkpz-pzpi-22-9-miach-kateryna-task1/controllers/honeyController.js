const Honey = require('../models/Honey');

// Створення нового запису меду
const createHoney = async (req, res) => {
    try {
        const honey = await Honey.create(req.body);
        res.status(201).json(honey);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Отримання всіх записів меду
const getAllHoney = async (req, res) => {
    try {
        const honey = await Honey.findAll();
        res.json(honey);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Отримання конкретного запису меду за ID
const getHoneyById = async (req, res) => {
    try {
        const honey = await Honey.findByPk(req.params.id);
        if (honey) {
            res.json(honey);
        } else {
            res.status(404).json({ error: 'Honey not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Оновлення запису меду за ID
const updateHoney = async (req, res) => {
    try {
        const [updated] = await Honey.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedHoney = await Honey.findByPk(req.params.id);
            res.json(updatedHoney);
        } else {
            res.status(404).json({ error: 'Honey not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Видалення запису меду за ID
const deleteHoney = async (req, res) => {
    try {
        const deleted = await Honey.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Honey not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createHoney,
    getAllHoney,
    getHoneyById,
    updateHoney,
    deleteHoney
};

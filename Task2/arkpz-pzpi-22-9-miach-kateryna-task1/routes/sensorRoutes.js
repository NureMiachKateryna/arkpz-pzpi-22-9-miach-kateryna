const express = require("express");
const router = express.Router();
const Sensor = require("../models/Sensor");

// Отримати всі сенсори
router.get("/", async (req, res) => {
    try {

        const sensors = await Sensor.findAll();
        res.json(sensors);
    } catch (error) {
        console.error("Error fetching sensors:", error);

        res.status(500).json({ error: "Failed to fetch sensors" });
    }
});

// Отримати дані конкретного сенсора за ID
router.get("/:id", async (req, res) => {
    try {
        const sensor = await Sensor.findByPk(req.params.id);
        if (!sensor) {
            return res.status(404).json({ error: "Sensor not found" });
        }
        res.json(sensor);
    } catch (error) {
        console.error("Error fetching sensors:", error);

        res.status(500).json({ error: "Failed to fetch sensor data" });
    }
});

// Створити новий сенсор
router.post("/", async (req, res) => {
    try {
        const { type, location, temperature, humidity } = req.body;

        // Проверка на type (1 или 2)
        if (![1, 2].includes(type)) {
            return res.status(400).json({ error: "Type must be 1 or 2" });
        }

        // Проверка на заполненность location
        if (!location || location.trim() === "") {
            return res.status(400).json({ error: "Location is required and cannot be empty" });
        }

        // Создание сенсора
        const sensor = await Sensor.create({ type, location, temperature, humidity });
        res.status(201).json(sensor);
    } catch (error) {
        console.error("Error creating sensor:", error);
        res.status(500).json({ error: "Failed to create sensor" });
    }
});


// Оновити дані сенсора
router.put("/:id", async (req, res) => {
    try {
        const sensor = await Sensor.findByPk(req.params.id);
        if (!sensor) {
            return res.status(404).json({ error: "Sensor not found" });
        }

        const { type, location, temperature, humidity } = req.body;

        // Перевірка на type (1 або 2)
        if (type !== undefined && ![1, 2].includes(type)) {
            return res.status(400).json({ error: "Type must be 1 or 2" });
        }

        // Перевірка на location
        if (location !== undefined && (!location || location.trim() === "")) {
            return res.status(400).json({ error: "Location cannot be empty" });
        }

        await sensor.update({ type, location, temperature, humidity });
        res.json(sensor);
    } catch (error) {
        console.error("Error updating sensor:", error);
        res.status(500).json({ error: "Failed to update sensor data" });
    }
});


// Видалити сенсор
router.delete("/:id", async (req, res) => {
    try {
        const sensor = await Sensor.findByPk(req.params.id);
        if (!sensor) {
            return res.status(404).json({ error: "Sensor not found" });
        }
        await sensor.destroy();
        res.json({ message: "Sensor deleted successfully" });
    } catch (error) {
        console.error("Error fetching sensors:", error);

        res.status(500).json({ error: "Failed to delete sensor" });
    }
});

// Оновити дані сенсора: температура, вологість
router.post("/:id/data", async (req, res) => {
    try {
        const sensor = await Sensor.findByPk(req.params.id);
        if (!sensor) {
            return res.status(404).json({ error: "Sensor not found" });
        }

        const { temperature, humidity } = req.body;

        // Перевірка, чи передані значення
        if (temperature === undefined || humidity === undefined) {
            return res.status(400).json({ error: "Temperature and humidity are required" });
        }

        await sensor.update({
            temperature,
            humidity,
            last_reading: new Date(),
        });
        res.json({ message: "Sensor data updated", sensor });
    } catch (error) {
        console.error("Error updating sensor data:", error);
        res.status(500).json({ error: "Failed to update sensor data" });
    }
});

const express = require("express");
const router = express.Router();
const Sensor = require("../models/Sensor");
const moment = require("moment");

// Отримати всі сенсори
router.get("/", async (req, res) => {
    try {
        const sensors = await Sensor.findAll();

        // Форматуємо дані для відправки
        const formattedSensors = sensors.map(sensor => ({
            id: sensor.id,
            location: sensor.location,
            temperature: sensor.temperature, // Включаємо температуру
            fullness: sensor.fullness,       // Включаємо заповненість
            last_reading: sensor.last_reading
                ? moment(sensor.last_reading).format("YYYY-MM-DD HH:mm:ss")
                : null,
        }));

        res.json(formattedSensors);
    } catch (error) {
        console.error("Error fetching sensors:", error);
        res.status(500).json({ error: "Failed to fetch sensors" });
    }
});

// Створити новий сенсор
router.post("/", async (req, res) => {
    try {
        const { location, temperature, fullness } = req.body;

        // Перевірка значень
        if (!location || location.trim() === "") {
            return res.status(400).json({ error: "Location is required and cannot be empty" });
        }

        // Створення нового сенсора
        const sensor = await Sensor.create({
            location,
            temperature,
            fullness,
        });

        res.status(201).json(sensor);
    } catch (error) {
        console.error("Error creating sensor:", error);
        res.status(500).json({ error: "Failed to create sensor" });
    }
});
// Оновити сенсор
router.put("/:id", async (req, res) => {
    try {
        const sensor = await Sensor.findByPk(req.params.id);
        if (!sensor) {
            return res.status(404).json({ error: "Sensor not found" });
        }

        const { location, temperature, fullness } = req.body;

        // Проверка на допустимые значения
        if (location !== undefined && (!location || location.trim() === "")) {
            return res.status(400).json({ error: "Location cannot be empty" });
        }

        // Обновить поля сенсора
        await sensor.update({
            location: location !== undefined ? location : sensor.location,
            temperature: temperature !== undefined ? temperature : sensor.temperature,
            fullness: fullness !== undefined ? fullness : sensor.fullness,
            last_reading: new Date(), // Обновить время чтения
        });

        res.json(sensor); // Отправить обновленный объект в ответе
    } catch (error) {
        console.error("Error updating sensor:", error); // Лог ошибки
        res.status(500).json({ error: "Failed to update sensor" }); // Ответ с ошибкой
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


module.exports = router;

const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

// Отримати всі звіти
router.get("/report", async (req, res) => {
    try {
        const reports = await Report.findAll();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

// Створити новий звіт
router.post("/report", async (req, res) => {
    try {
        const report = await Report.create(req.body);
        res.status(201).json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create report" });
    }
});

// Оновити звіт
router.put("/report/:id", async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.id);
        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }
        await report.update(req.body);
        res.json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update report" });
    }
});

// Видалити звіт
router.delete("/report/:id", async (req, res) => {
    try {
        const report = await Report.findByPk(req.params.id);
        if (!report) {
            return res.status(404).json({ error: "Report not found" });
        }
        await report.destroy();
        res.json({ message: "Report deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete report" });
    }
});

module.exports = router;

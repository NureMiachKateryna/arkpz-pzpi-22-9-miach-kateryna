const axios = require("axios");

// Симуляція зчитування даних із Serial Monitor
function getSimulatedSensorData() {
    // Заміни ці значення тими, які ти бачиш у Tinkercad
    const temperature = (Math.random() * (35 - 15) + 15).toFixed(2); // Температура між 15-35°C
    const humidity = (Math.random() * (100 - 20) + 20).toFixed(2); // Вологість між 20-100%
    return { temperature, humidity };
}

// Надсилання даних на сервер
async function sendDataToServer() {
    const sensorData = getSimulatedSensorData();

    try {
        const response = await axios.post("http://localhost:3000/sensor/1/data", sensorData);
        console.log("Дані надіслано успішно:", response.data);
    } catch (error) {
        console.error("Помилка під час надсилання даних:", error.message);
    }
}

// Запускаємо симуляцію передачі даних кожні 5 секунд
setInterval(sendDataToServer, 5000);

const mongoose = require('mongoose');
const batteryRegistration = new mongoose.Schema({
    batteryType: {
        type: String,
    },
    batterySize: {
        type: String,
    },
    batteryImage: {
        type: String,
    }
});

module.exports = mongoose.model("Battery", batteryRegistration);
const mongoose = require('mongoose');
const tyreRegistration = new mongoose.Schema({
    tyreType: {
        type: String,
    },

    tyreSize: {
        type: String,
    },
    tyreServices: {
        type: String,
    }
});

module.exports = mongoose.model("Tyre", tyreRegistration);
const mongoose = require('mongoose');

const vehicleRegistration = new mongoose.Schema({
driverName: {
    type: String,
    trim: true
},
phoneNumber: {
    type: String,
},
vehicleType: {
    type: String,
    trim: true
},
numberPlate: {
    type: String,
    trim: true
},
vehicleModel: {
    type: String,
    trim: true
},
vehicleColor: {
    type: String,
    trim: true
},
vehicleImage: {
    type: String,
},
ninNumber: {
    type: String,
    trim: true
},
arrivalTime: {
    type: Date,
    default: Date.now
},
receiptNumber: {
    type: String,
    unique: true
},
status: {
    type: String,
    enum: ["Parked", "Signed-out"],
    default: "Parked"
},
});


module.exports = mongoose.model("Vehicle", vehicleRegistration);
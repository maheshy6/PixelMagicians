const mongoose = require("mongoose");

const DriverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    assignedVehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", default: null },
    drivingHistory: [
        {
            date: { type: Date, default: Date.now },
            incident: { type: String },
        },
    ],
});
const Driver=mongoose.model("Driver", DriverSchema);

module.exports = Driver;

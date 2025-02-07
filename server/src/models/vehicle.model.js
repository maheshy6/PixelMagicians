const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    licensePlate: { type: String, required: true, unique: true },
    mileage: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "maintenance", "inactive"], default: "active" },
    lastServiceDate: { type: Date, default: Date.now },
    assignedDriver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", default: null },
});
const Vehicle=mongoose.model("Vehicle", VehicleSchema);

module.exports = Vehicle;

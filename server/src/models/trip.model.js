const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
    startLocation: { type: String, required: true },
    endLocation: { type: String, required: true },
    distance: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    fuelConsumed: { type: Number },
    purpose: { type: String },
    createdAt: { type: Date, default: Date.now }
});
const Trip=mongoose.model("Trip", TripSchema);

module.exports = Trip;

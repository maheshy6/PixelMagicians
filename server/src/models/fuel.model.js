const mongoose = require("mongoose");

const FuelSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
    fuelAdded: { type: Number, required: true }, // Amount of fuel added (liters or gallons)
    mileageBefore: { type: Number, required: true }, // Mileage before refueling
    mileageAfter: { type: Number, required: true }, // Mileage after refueling
    fuelCost: { type: Number, required: true }, // Cost of refueling
    fuelDate: { type: Date, default: Date.now }
});
const Fuel = mongoose.model("Fuel", FuelSchema);
module.exports = Fuel;

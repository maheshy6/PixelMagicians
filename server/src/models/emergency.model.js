const mongoose = require("mongoose");

const EmergencySchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
  location: { type: String, required: true },
  emergencyType: { type: String, required: true }, // Example: "Accident", "Engine Failure", "Medical Issue"
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});
const Emergency=mongoose.model("Emergency", EmergencySchema);

module.exports = Emergency;

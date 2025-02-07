const mongoose = require("mongoose");

const MaintenanceSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    maintenanceType: { type: String, required: true },
    scheduledDate: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
    cost: { type: Number },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Maintenance=mongoose.model("Maintenance", MaintenanceSchema);

module.exports = Maintenance;

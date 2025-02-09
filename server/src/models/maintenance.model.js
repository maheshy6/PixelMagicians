const mongoose = require("mongoose");

const MaintenanceSchema = new mongoose.Schema({
    vehicle: { type: String, required: true },
    maintenanceType: { type: String, required: true },
    scheduledDate: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Completed"], default: "Pending" },
    cost: { type: String },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
    email: { type: String, required:true }
});

const Maintenance=mongoose.model("Maintenance", MaintenanceSchema);

module.exports = Maintenance;

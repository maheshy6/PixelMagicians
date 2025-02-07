const Maintenance = require("../models/maintenance.model");


// ✅ Schedule Maintenance
exports.scheduleMaintenance = async (req, res) => {
    try {
        const { vehicle, maintenanceType, scheduledDate, cost, notes } = req.body;

        const maintenance = new Maintenance({ vehicle, maintenanceType, scheduledDate, cost, notes });
        await maintenance.save();

        res.status(201).json(maintenance);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
}


// ✅ Get all maintenance records
exports.getAllMaintenance = async (req, res) => {
    try {
        const records = await Maintenance.find().populate("vehicle");
        res.json(records);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
}

// ✅ Get maintenance history for a specific vehicle
exports.maintenanceHistoryByVehicleId = async (req, res) => {
    try {
        const records = await Maintenance.find({ vehicle: req.params.vehicleId }).populate("vehicle");
        res.json(records);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
}

// ✅ Update maintenance status
exports.updateMaintenanceStatus = async (req, res) => {
    try {
        let record = await Maintenance.findById(req.params.id);
        if (!record) return res.status(404).json({ msg: "Record not found" });

        record = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(record);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
}
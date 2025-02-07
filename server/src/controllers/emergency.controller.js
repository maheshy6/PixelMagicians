const Emergency = require("../models/emergency.model")

//Report an Emergency
exports.reportEmergency = async (req, res) => {
    try {
        const { driver, vehicle, location, emergencyType, message } = req.body
        const emergency = new Emergency({ driver, vehicle, location, emergencyType, message })
        await emergency.save()
    } catch (error) {
        res.status(500).json({ msg: "Server Error", error: error.message })
    }
}

// Get all emergency alerts
exports.getAllEmergencies = async (req, res) => {
    try {
        const alerts = await Emergency.find().populate("driver vehicle");
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
};

//Get emergencies for a specific driver
exports.getEmergenciesByDriver = async (req, res) => {
    try {
        const alerts = await Emergency.find({ driver: req.params.driverId }).populate("driver vehicle");
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
};
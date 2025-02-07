const Driver = require("../models/driver.model")
const Vehicle = require("../models/vehicle.model")

//Create a new driver
exports.addNewDriver = async (req, res) => {
    try {
        const { name, email, phone, licenseNumber, assignedVehicle } = req.body;
        let driver = await Driver.findOne({ email });
        if (driver) return res.status(400).json({ msg: "Driver already exists" });
        driver = new Driver({ name, email, phone, licenseNumber, assignedVehicle });
        await driver.save();
        if (assignedVehicle) {
            await Vehicle.findByIdAndUpdate(assignedVehicle, { assignedDriver: driver._id });
        }
        res.status(201).json(driver);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
}

// ✅ Get all drivers
exports.getAllDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find().populate("assignedVehicle");
        res.json(drivers);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
}

//get specific driver by id
exports.getDriverById = async (req, res) => {
    try {
        const driver = await Driver.findById(req.params.id).populate("assignedVehicle");
        if (!driver) return res.status(404).json({ msg: "Driver not found" });

        res.json(driver);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
}

//update driver details
exports.updateDriverDetailById = async (req, res) => {
    try {
        let driver = await Driver.findById(req.params.id);
        if (!driver) return res.status(404).json({ msg: "Driver not found" });

        driver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(driver);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
}

//delete a driver
exports.deleteDriverById = async (req, res) => {
    try {
        let driver = await Driver.findById(req.params.id);
        if (!driver) return res.status(404).json({ msg: "Driver not found" });

        await driver.remove();
        res.json({ msg: "Driver removed" });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
}
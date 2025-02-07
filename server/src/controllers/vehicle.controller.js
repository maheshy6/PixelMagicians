const Vehicle = require("../models/vehicle.model");

// ✅ Add a new vehicle
const addVehicle = async (req, res) => {
    try {
        const { make, model, licensePlate, mileage } = req.body;

        let vehicle = await Vehicle.findOne({ licensePlate });
        if (vehicle) return res.status(400).json({ msg: "Vehicle already exists" });

        vehicle = new Vehicle({ make, model, licensePlate, mileage });
        await vehicle.save();

        res.status(201).json(vehicle);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// ✅ Get all vehicles
const getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate("assignedDriver");
        res.json(vehicles);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// ✅ Get a single vehicle by ID
const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id).populate("assignedDriver");
        if (!vehicle) return res.status(404).json({ msg: "Vehicle not found" });

        res.json(vehicle);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// ✅ Update vehicle details
const updateVehicle = async (req, res) => {
    try {
        let vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ msg: "Vehicle not found" });

        vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(vehicle);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// ✅ Delete a vehicle
const deleteVehicle = async (req, res) => {
    try {
        let vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ msg: "Vehicle not found" });

        await vehicle.remove();
        res.json({ msg: "Vehicle removed" });
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = { addVehicle, getAllVehicles, getVehicleById, updateVehicle, deleteVehicle };

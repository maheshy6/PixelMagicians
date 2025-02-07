const Trip = require("../models/trip.model");

// ✅ Log a new trip
exports.logTrip = async (req, res) => {
    try {
        const { driver, vehicle, startLocation, endLocation, distance, fuelUsed, startTime, endTime, purpose } = req.body;

        const trip = new Trip({ driver, vehicle, startLocation, endLocation, distance, fuelUsed, startTime, endTime, purpose });
        await trip.save();

        res.status(201).json(trip);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// ✅ Get all trips
exports.getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find().populate("driver vehicle");
        res.json(trips);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// ✅ Get trips for a specific vehicle
exports.getTripsByVehicle = async (req, res) => {
    try {
        const trips = await Trip.find({ vehicle: req.params.vehicleId }).populate("driver vehicle");
        res.json(trips);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// ✅ Get trips for a specific driver
exports.getTripsByDriver = async (req, res) => {
    try {
        const trips = await Trip.find({ driver: req.params.driverId }).populate("driver vehicle");
        res.json(trips);
    } catch (err) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// module.exports = { logTrip, getAllTrips, getTripsByVehicle, getTripsByDriver };

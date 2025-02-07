const express = require("express");
const router = express.Router();
const {
    logTrip,
    getAllTrips,
    getTripsByVehicle,
    getTripsByDriver } = require("../controllers/trip.controller");

// ✅ Log a new trip
router.post("/", logTrip);

// ✅ Get all trips
router.get("/", getAllTrips);

// ✅ Get trips for a specific vehicle
router.get("/vehicle/:vehicleId", getTripsByVehicle);

// ✅ Get trips for a specific driver
router.get("/driver/:driverId", getTripsByDriver);

module.exports = router;

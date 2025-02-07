const express = require("express");
const router = express.Router();
const { logFuelEntry,
    getAllFuelRecords,
    getFuelByVehicle,
    getFuelByDriver
} = require("../controllers/fuel.controller")

// ✅ Log fuel consumption
router.post("/", logFuelEntry);

// ✅ Get all fuel records
router.get("/", getAllFuelRecords);

// ✅ Get fuel records for a specific vehicle
router.get("/vehicle/:vehicleId", getFuelByVehicle);

// ✅ Get fuel records for a specific driver
router.get("/driver/:driverId", getFuelByDriver);

module.exports = router;

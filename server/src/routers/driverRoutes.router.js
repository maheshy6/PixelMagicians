const express = require("express");
const router = express.Router();
const {
    addNewDriver,
    getAllDrivers,
    getDriverById,
    updateDriverDetailById,
    deleteDriverById
} = require("../controllers/driver.controller");
// const Driver = require("../models/driver.model");
// const Vehicle = require("../models/vehicle.model");

// ✅ Add a new driver
router.post("/", addNewDriver);

// ✅ Get all drivers
router.get("/", getAllDrivers);

// ✅ Get a single driver by ID
router.get("/:id", getDriverById);

// ✅ Update driver details
router.put("/:id", updateDriverDetailById);

// ✅ Delete a driver
router.delete("/:id", deleteDriverById);

module.exports = router;

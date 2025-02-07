const express = require("express");
const router = express.Router();
const { reportEmergency,
    getAllEmergencies,
    getEmergenciesByDriver
} = require("../controllers/emergency.controller")

// ✅ Report an emergency
router.post("/", reportEmergency);

// ✅ Get all emergency alerts
router.get("/", getAllEmergencies);

// ✅ Get emergencies for a specific driver
router.get("/driver/:driverId", getEmergenciesByDriver);

module.exports = router;

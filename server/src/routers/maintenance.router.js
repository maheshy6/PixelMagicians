const express = require("express");
const router = express.Router();
const {
  scheduleMaintenance,
  getAllMaintenance,
  maintenanceHistoryByVehicleId,
  updateMaintenanceStatus
} = require("../controllers/maintenance.controller")

// ✅ Schedule Maintenance
router.post("/", scheduleMaintenance);

// ✅ Get all maintenance records
router.get("/", getAllMaintenance);

// ✅ Get maintenance history for a specific vehicle
router.get("/vehicle/:vehicleId", maintenanceHistoryByVehicleId);

// ✅ Update maintenance status
router.put("/:id", updateMaintenanceStatus);

module.exports = router;

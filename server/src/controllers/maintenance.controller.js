const Maintenance = require("../models/maintenance.model");
const {formatDateTime , insertEvent} = require("../services/calender.service.js");
const sendEmail = require("../services/email.service.js");
// ✅ Schedule Maintenance
exports.scheduleMaintenance = async (req, res) => {
    try {
        const { vehicle, maintenanceType, scheduledDate, cost, notes, email} = req.body;

        const maintenance = new Maintenance({ vehicle, maintenanceType, scheduledDate, cost, notes, email});
        await maintenance.save();
        
        //Schedule vehicle maintenance based on customer-provided details in Google Calender
        // Create the event object
        //hard coded destination
        let destination="Adinath MSIL Service PVT. LTD."
         const event = {
            summary: `Service of ${vehicle}`,
            description: `
                Service Details:
                - vehiclen_ame: ${vehicle}
                - Service center: ${destination}
                - Date: ${scheduledDate}
                - Estimated Cost: ₹${cost}
            `,
            start: {
                dateTime: formatDateTime(startDate),
                timeZone: 'Asia/Kolkata'
            },
            end: {
                dateTime: formatDateTime(startDate),
                timeZone: 'Asia/Kolkata'
            }
        };

        // Insert event into Google Calendar
        const response = await insertEvent(event);
        console.log(response)

        //google calender setup ends here
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
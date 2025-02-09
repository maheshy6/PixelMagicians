const Maintenance = require("../models/maintenance.model.js");
const {formatDateTime , insertEvent} = require("../services/calender.service.js");
const {sendEmail }= require("../services/email.service.js");
// ✅ Schedule Maintenance
exports.scheduleMaintenance = async (req, res) => {
    //console.log(req.body)
    try {
        const { vehicle, maintenanceType, scheduledDate, cost, notes, email} = req.body;

        const maintenance = new Maintenance({ vehicle, maintenanceType, scheduledDate, cost, notes, email});
        await maintenance.save();
        
        // Schedule vehicle maintenance based on customer-provided details in Google Calender
        // Create the event object
        // hard coded destination
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
                dateTime: formatDateTime(scheduledDate),
                timeZone: 'Asia/Kolkata'
            },
            end: {
                dateTime: formatDateTime(scheduledDate),
                timeZone: 'Asia/Kolkata'
            }
        };

        // Insert event into Google Calendar
        const response = await insertEvent(event);
        //console.log(response)

        //google calender setup ends here

        //send email
       
        // await sendEmail(
        //     maintenance.email,
        //     "Service Scheduled",
        //     `you have an service scheduled on ${maintenance.scheduledDate} at ${destination} and
        //     estimated cost is ${maintenance.cost} we will take care of your notes = ${maintenance.notes}`,
        //     3
        // )

        //2nd
        await sendEmail(
            maintenance.email,
            "🚗 Service Scheduled!",
            `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
                <h2 style="color: #007BFF;">🔧 Your Vehicle Service is Scheduled!</h2>
                <p>Dear Customer,</p>
                <p>Your service is scheduled on <strong style="color: #28a745;">${maintenance.scheduledDate}</strong> at 
                <strong style="color: #dc3545;">${destination}</strong>.</p>
                
                <h3 style="color: #6f42c1;">📌 Service Details:</h3>
                <ul>
                    <li><strong>Vehicle:</strong> ${maintenance.vehicle}</li>
                    <li><strong>Estimated Cost:</strong> ₹${maintenance.cost}</li>
                    <li><strong>Notes:</strong> ${maintenance.notes}</li>
                </ul>
        
                <p>We look forward to serving you!</p>
                <p style="color: #007BFF;"><strong>🚗 Happy Driving!</strong></p>
            </div>
            `,
            3
        );
        
        //send email ends here
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
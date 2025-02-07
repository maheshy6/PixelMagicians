const Fuel=require("../models/fuel.model");

//log fuel consumption
exports.logFuelEntry=async(req,res)=>{
    try {
        const {vehicle,driver,fuelAdded,mileageBefore, mileageAfter, fuelCost}=req.body;
        const fuelEntry=new Fuel({vehicle,driver,fuelAdded,mileageBefore, mileageAfter, fuelCost})
        await fuelEntry.save();
        res.status(201).json(fuelEntry)
    } catch (error) {
        res.status(500).json({msg:"Server Error", error:error.message})
    }
}

//get all fuel records
exports.getAllFuelRecords=async(req,res)=>{
    try {
        const records=await Fuel.find().populate("vehicle driver");
        res.status(200).json(records)
    } catch (error) {
        res.status(500).json({msg:"Server Error", error:error.message})
    }
}

//Get fuel records for a specific vehicle
exports.getFuelByVehicle=async(req,res)=>{
    try {
        const records=await Fuel.find({vehicle: req.params.vehicleId}).populate("vehicle driver")
        res.json(records)
    } catch (error) {
        res.status(500).json({msg:"Server Error", error:error.message})
        
    }
}

//Get fuel record for a specific driver
exports.getFuelByDriver=async(req,res)=>{
    try {
        const records=await Fuel.find({vehicle: req.params.driverId}).populate("vehicle driver")
        res.json(records)
    } catch (error) {
        res.status(500).json({msg:"Server Error", error:error.message})
        
    }
}

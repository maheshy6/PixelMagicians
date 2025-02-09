const mongoose = require("mongoose");

const connectToDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CLOUD_URL);
        console.log("Connected to DB");
    } catch (error) {
        console.error("Connection failed", error.message);
        process.exit(1);
    }
}

module.exports=connectToDB
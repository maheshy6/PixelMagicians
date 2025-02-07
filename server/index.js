require("dotenv").config()
const cors = require("cors");
const express = require("express");
const connectToDB = require("./config/db.js")
const app = express()
const port = process.env.PORT || 3000
//middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Welcome to our server side.</h1>');
});
//routes
app.use("/api/auth", require("./src/routers/authRoutes.router.js"));
app.use("/api/vehicles", require("./src/routers/vehicleRoutes.router"));
app.use("/api/drivers", require("./src/routers/driverRoutes.router"));
app.use("/api/trips", require("./src/routers/trip.router"));
app.use("/api/maintenance", require("./src/routers/maintenance.router"));
app.use("/api/fuel", require("./src/routers/fuel.router"));
app.use("/api/emergency", require("./src/routers/emergency.router"));
app.use("/api/user", require("./src/routers/user.router.js"));


app.use((req, res, next) => {
    res.status(404).json({ message: "this api is not defined you may hit wrong api" });
});

app.listen(port, () => {
    try {
        console.log("Server connected")
        connectToDB()
    } catch (error) {
        console.log("Server Error")
    }

})
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) return res.status(401).json({ message: "Access Denied" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) return res.status(401).json({ message: "User not found" });

        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = authMiddleware;

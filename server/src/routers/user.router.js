const express = require("express");
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    getUserProfile 
} = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes (Requires Authentication)
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;

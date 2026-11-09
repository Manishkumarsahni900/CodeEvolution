const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Admin Dashboard Route
router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {

    res.status(200).json({
        message: "Welcome to Admin Dashboard!",
        user: req.user
    });

});

module.exports = router;
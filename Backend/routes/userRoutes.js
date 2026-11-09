const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

// Protected Route
router.get("/profile", authMiddleware, (req, res) => {

    res.status(200).json({
        message: "Profile accessed successfully!",
        user: req.user
    });

});

module.exports = router;
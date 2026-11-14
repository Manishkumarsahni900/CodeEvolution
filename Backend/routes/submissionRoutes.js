
const express = require("express");
const router = express.Router();

const {
    runCode,
    submitCode,
    getMySubmissions
} = require("../controllers/submissionController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/my-submissions", authMiddleware, getMySubmissions);
router.post("/run", authMiddleware, runCode);
router.post("/submit", authMiddleware, submitCode);

module.exports = router;



const express = require("express");
const router = express.Router();

const {
    runCode,
    submitCode,
    getMySubmissions
} = require("../controllers/submissionController");

const authMiddleware = require("../middleware/authMiddleware");
const studentMiddleware = require("../middleware/studentMiddleware");

router.get("/my-submissions", authMiddleware, studentMiddleware, getMySubmissions);
router.post("/run", authMiddleware, studentMiddleware, runCode);
router.post("/submit", authMiddleware, studentMiddleware, submitCode);

module.exports = router;


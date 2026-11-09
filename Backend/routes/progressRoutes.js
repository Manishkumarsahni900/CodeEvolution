
const express = require("express");
const router = express.Router();

const {
    getMyProgress,
    completeLesson,
    solveQuestion
} = require("../controllers/progressController");

const authMiddleware = require("../middleware/authMiddleware");

// Get logged-in student's progress
router.get("/", authMiddleware, getMyProgress);

// Mark lesson as completed
router.post("/lesson/:lessonId/complete", authMiddleware, completeLesson);

// Mark question as solved
router.post("/question/:questionId/solve", authMiddleware, solveQuestion);

module.exports = router;

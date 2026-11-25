
const express = require("express");
const router = express.Router();

const {
    getMyProgress,
    completeLesson,
    solveQuestion
} = require("../controllers/progressController");

const authMiddleware = require("../middleware/authMiddleware");
const studentMiddleware = require("../middleware/studentMiddleware");

// Get logged-in student's progress
router.get("/", authMiddleware, studentMiddleware, getMyProgress);

// Mark lesson as completed
router.post("/lesson/:lessonId/complete", authMiddleware, studentMiddleware, completeLesson);

// Mark question as solved
router.post("/question/:questionId/solve", authMiddleware, studentMiddleware, solveQuestion);

module.exports = router;

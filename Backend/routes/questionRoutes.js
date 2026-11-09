const express = require("express");
const router = express.Router();

const {
    createQuestion,
    getQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
} = require("../controllers/questionController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

//Get all Questions (Public)
router.get("/", getQuestions);
// Get Single Question (Public)
router.get("/:id", getQuestionById);

// Update Question (Admin Only)
router.patch("/:id", authMiddleware, adminMiddleware, updateQuestion);

// Delete Question (Admin Only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteQuestion);

// Create Question (Admin Only)
router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createQuestion
);

module.exports = router;
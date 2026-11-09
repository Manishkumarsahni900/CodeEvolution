const express = require("express");
const router = express.Router();

const {
    createLesson,
    getLessons,
    getLessonById,
    updateLesson,
    deleteLesson
} = require("../controllers/lessonController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Create Lesson (Admin Only)
router.post("/", authMiddleware, adminMiddleware, createLesson);

// Get All Lessons of a Course (Public)
router.get("/course/:courseId", getLessons);

// Get Single Lesson (Public)
router.get("/:id", getLessonById);

// Update Lesson (Admin Only)
router.patch("/:id", authMiddleware, adminMiddleware, updateLesson);

// Delete Lesson (Admin Only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteLesson);

module.exports = router;
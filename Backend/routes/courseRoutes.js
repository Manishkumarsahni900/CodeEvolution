const express = require("express");
const router = express.Router();

const {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Create Course (Admin Only)
router.post("/", authMiddleware, adminMiddleware, createCourse);

// Get All Courses (Public)
router.get("/", getCourses);

// Get Single Course (Public)
router.get("/:id", getCourseById);

// Update Course (Admin Only)
router.patch("/:id", authMiddleware, adminMiddleware, updateCourse);

// Delete Course (Admin Only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteCourse);

module.exports = router;
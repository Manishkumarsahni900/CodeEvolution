const express = require("express");
const router = express.Router();

const { 
    createTest, 
    getTests, 
    getTestById, 
    updateTest, 
    deleteTest,
    submitTest,
    getMyResults,
    getAllResults,
    getResultById
} = require("../controllers/testController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Get All Tests (Public)
router.get("/", getTests);

// Get Logged-in Student's Results
router.get("/my-results", authMiddleware, getMyResults);

// Get All Results (Admin Only)
router.get("/all-results", authMiddleware, adminMiddleware, getAllResults);

// Get Result By ID (Admin Only)
router.get("/results/:resultId", authMiddleware, adminMiddleware, getResultById);

// Get Single Test (Public)
router.get("/:id", getTestById);

// Update Test (Admin Only)
router.patch("/:id", authMiddleware, adminMiddleware, updateTest);

// Delete Test (Admin Only)
router.delete("/:id", authMiddleware, adminMiddleware, deleteTest);

// Submit Test (Student Only)
router.post("/:id/submit", authMiddleware, submitTest);

// Create Test (Admin Only)
router.post("/", authMiddleware, adminMiddleware, createTest);

module.exports = router;
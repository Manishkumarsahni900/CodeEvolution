const Lesson = require("../models/Lesson");

// Create Lesson
const createLesson = async (req, res) => {
    try {
        const {
            course,
            title,
            description,
            content,
            codeExamples,
            practicalImages,
            order
        } = req.body;

        // Check required fields
        if (!course || !title || !content || order === undefined) {
            return res.status(400).json({
                message: "Course, title, content and order are required."
            });
        }

        // Create new lesson
        const lesson = await Lesson.create({
            course,
            title,
            description,
            content,
            codeExamples,
            practicalImages,
            order
        });

        res.status(201).json({
            message: "Lesson created successfully!",
            lesson
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Get All Lessons
const getLessons = async (req, res) => {
    try {
        const { courseId } = req.params;
        const lessons = await Lesson.find({ course: courseId })
            .populate("course", "title language")
            .sort({ order: 1 });

        res.status(200).json({
            message: "Lessons fetched successfully!",
            totalLessons: lessons.length,
            lessons
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Get Single Lesson
const getLessonById = async (req, res) => {
    try {
        const lesson = await Lesson.findById(req.params.id)
            .populate("course", "title language");

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found."
            });
        }

        res.status(200).json({
            message: "Lesson fetched successfully!",
            lesson
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Update Lesson
const updateLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found."
            });
        }

        res.status(200).json({
            message: "Lesson updated successfully!",
            lesson
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Delete Lesson
const deleteLesson = async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndDelete(req.params.id);

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found."
            });
        }

        res.status(200).json({
            message: "Lesson deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = { 
    createLesson, 
    getLessons, 
    getLessonById,
    updateLesson,
    deleteLesson
};
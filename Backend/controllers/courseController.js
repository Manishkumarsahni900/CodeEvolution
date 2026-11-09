const Course = require("../models/Course");

// Create Course
const createCourse = async (req, res) => {
    try {
        const { title, description, language, level, thumbnail } = req.body;
        // Check required fields
        if (!title || !description || !language) {
            return res.status(400).json({
                message: "Title, description and language are required."
            });
        }
        // Create new course
        const course = await Course.create({
            title,
            description,
            language,
            level,
            thumbnail,
            createdBy: req.user.id
        });
        res.status(201).json({
            message: "Course created successfully!",
            course
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Get All Courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find()
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Courses fetched successfully!",
            totalCourses: courses.length,
            courses
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Get Single Course
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate("createdBy", "name email");

        if (!course) {
            return res.status(404).json({
                message: "Course not found."
            });
        }

        res.status(200).json({
            message: "Course fetched successfully!",
            course
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Update Course
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );
        if (!course) {
            return res.status(404).json({
                message: "Course not found."
            });
        }
        res.status(200).json({
            message: "Course updated successfully!",
            course
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Delete Course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found."
            });
        }

        res.status(200).json({
            message: "Course deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = { 
    createCourse, 
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse
};
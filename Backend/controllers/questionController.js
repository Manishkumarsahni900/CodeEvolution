const Question = require("../models/Question");

// Create Question
const createQuestion = async (req, res) => {
    try {
        const {
            title,
            description,
            topic,
            difficulty,
            constraints,
            examples,
            testCases,
            points
        } = req.body;

        // Check required fields
        if (!title || !description || !topic) {
            return res.status(400).json({
                message: "Title, description and topic are required."
            });
        }

        // Save Question in MongoDB
        const question = await Question.create({
            title,
            description,
            topic,
            difficulty,
            constraints,
            examples,
            testCases,
            points
        });

        res.status(201).json({
            message: "Question created successfully!",
            question
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Get All Questions
const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find()
            .select("-testCases")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Questions fetched successfully!",
            totalQuestions: questions.length,
            questions
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Get Single Question
const getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id)
            .select("-testCases");

        if (!question) {
            return res.status(404).json({
                message: "Question not found."
            });
        }

        res.status(200).json({
            message: "Question fetched successfully!",
            question
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Update Question
const updateQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select("-testCases");

        if (!question) {
            return res.status(404).json({
                message: "Question not found."
            });
        }

        res.status(200).json({
            message: "Question updated successfully!",
            question
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Delete Question
const deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);

        if (!question) {
            return res.status(404).json({
                message: "Question not found."
            });
        }

        res.status(200).json({
            message: "Question deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = { 
    createQuestion, 
    getQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion
};
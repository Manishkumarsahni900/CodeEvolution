const Test = require("../models/Test");
const TestResult = require("../models/TestResult");
const Progress = require("../models/Progress");

// Create Test
const createTest = async (req, res) => {
    try {
        const {
            title,
            description,
            questions,
            duration,
            totalMarks,
            passingMarks,
            level
        } = req.body;

        if (!title || !duration || !totalMarks) {
            return res.status(400).json({
                message: "Title, duration and total marks are required."
            });
        }

        const test = await Test.create({
            title,
            description,
            questions,
            duration,
            totalMarks,
            passingMarks,
            level
        });

        res.status(201).json({
            message: "Test created successfully!",
            test
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Get All Tests
const getTests = async (req, res) => {
    try {
        const tests = await Test.find()
            .populate("questions", "title topic difficulty")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Tests fetched successfully!",
            totalTests: tests.length,
            tests
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Get Single Test
const getTestById = async (req, res) => {
    try {
        const test = await Test.findById(req.params.id)
            .populate("questions", "title description topic difficulty examples");

        if (!test) {
            return res.status(404).json({
                message: "Test not found."
            });
        }

        res.status(200).json({
            message: "Test fetched successfully!",
            test
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Update Test
const updateTest = async (req, res) => {
    try {
        const test = await Test.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate("questions", "title topic difficulty");

        if (!test) {
            return res.status(404).json({
                message: "Test not found."
            });
        }

        res.status(200).json({
            message: "Test updated successfully!",
            test
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Delete Test
const deleteTest = async (req, res) => {
    try {
        const test = await Test.findByIdAndDelete(req.params.id);

        if (!test) {
            return res.status(404).json({
                message: "Test not found."
            });
        }

        res.status(200).json({
            message: "Test deleted successfully!"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Submit Test
const submitTest = async (req, res) => {
    try {
        const { answers, timeTaken } = req.body;

        const test = await Test.findById(req.params.id)
            .populate("questions");

        if (!test) {
            return res.status(404).json({
                message: "Test not found."
            });
        }

        let score = 0;
        const submittedAnswers = [];

        for (const question of test.questions) {
            const submitted = answers.find(
                (answer) => answer.question === question._id.toString()
            );

            if (!submitted) continue;

            const isCorrect =
                submitted.answer === question.correctAnswer;

            if (isCorrect) {
                score += question.points;
            }

            submittedAnswers.push({
                question: question._id,
                submittedAnswer: submitted.answer,
                isCorrect
            });
        }

        const status = score >= test.passingMarks ? "Passed" : "Failed";

        const result = await TestResult.create({
            user: req.user.id,
            test: test._id,
            score,
            totalMarks: test.totalMarks,
            status,
            answers: submittedAnswers,
            timeTaken
        });

        // Update Student Progress
        let progress = await Progress.findOne({
            user: req.user.id
        });

        if (!progress) {
            progress = await Progress.create({
                user: req.user.id
            });
        }

        if (!progress.completedTests.some(
            (id) => id.toString() === test._id.toString()
        )) {
            progress.completedTests.push(test._id);
            progress.totalPoints += score;

            await progress.save();
        }
        res.status(201).json({
            message: "Test submitted successfully!",
            result
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Get Logged-in Student's Test Results
const getMyResults = async (req, res) => {
    try {
        const results = await TestResult.find({
            user: req.user.id
        })
            .populate("test", "title duration totalMarks")
            .populate("answers.question", "title topic difficulty")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Your test results fetched successfully!",
            totalResults: results.length,
            results
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Get All Students' Test Results (Admin)
const getAllResults = async (req, res) => {
    try {
        const results = await TestResult.find()
            .populate("user", "name email")
            .populate("test", "title duration totalMarks")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "All test results fetched successfully!",
            totalResults: results.length,
            results
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Get Test Result By ID (Admin)
const getResultById = async (req, res) => {
    try {
        const result = await TestResult.findById(req.params.resultId)
            .populate("user", "name email")
            .populate("test", "title duration totalMarks")
            .populate("answers.question", "title topic difficulty");

        if (!result) {
            return res.status(404).json({
                message: "Test result not found."
            });
        }

        res.status(200).json({
            message: "Test result fetched successfully!",
            result
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = { 
    createTest,
    getTests,
    getTestById,
    updateTest,
    deleteTest,
    submitTest,
    getMyResults,
    getAllResults,
    getResultById
};

const Progress = require("../models/Progress");
const Lesson = require("../models/Lesson");
const Question = require("../models/Question");

// Get Student Progress
const getMyProgress = async (req, res) => {
    try {
        let progress = await Progress.findOne({
            user: req.user.id
        })
        .populate("completedLessons", "title")
        .populate("solvedQuestions", "title topic difficulty")
        .populate("completedTests", "title");

        if (!progress) {
            progress = await Progress.create({
                user: req.user.id
            });
        }

        res.status(200).json({
            message: "Progress fetched successfully!",
            progress
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Mark Lesson as Completed
const completeLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;

        const lesson = await Lesson.findById(lessonId);

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found!"
            });
        }

        let progress = await Progress.findOne({
            user: req.user.id
        });

        if (!progress) {
            progress = await Progress.create({
                user: req.user.id
            });
        }

        if (progress.completedLessons.some(
            (id) => id.toString() === lessonId.toString()
        )) {
            return res.status(200).json({
                message: "Lesson already completed!",
                progress
            });
        }

        progress.completedLessons.push(lessonId);
        await progress.save();

        res.status(200).json({
            message: "Lesson completed successfully!",
            progress
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Mark Question as Solved
const solveQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;

        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).json({
                message: "Question not found!"
            });
        }

        let progress = await Progress.findOne({
            user: req.user.id
        });

        if (!progress) {
            progress = await Progress.create({
                user: req.user.id
            });
        }

        if (progress.solvedQuestions.includes(questionId)) {
            return res.status(200).json({
                message: "Question already solved!",
                progress
            });
        }

        progress.solvedQuestions.push(questionId);
        progress.totalPoints += question.points;

        await progress.save();

        res.status(200).json({
            message: "Question solved successfully!",
            progress
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getMyProgress,
    completeLesson,
    solveQuestion
};

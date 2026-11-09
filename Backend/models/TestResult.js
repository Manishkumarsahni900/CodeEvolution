const mongoose = require("mongoose");

const testResultSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
        required: true
    },

    score: {
        type: Number,
        required: true
    },

    totalMarks: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["Passed", "Failed"],
        required: true
    },

    answers: [{
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        },
        submittedAnswer: String,
        isCorrect: Boolean
    }],

    timeTaken: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

const TestResult = mongoose.model("TestResult", testResultSchema);

module.exports = TestResult;
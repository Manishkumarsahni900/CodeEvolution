const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true
    },
    sourceCode: {
        type: String,
        required: true
    },
    language: {
        type: String,
        enum: ["Java", "C++", "C", "Python", "JavaScript"],
        required: true
    },
    status: {
        type: String,
        enum: [
            "Pending",
            "Accepted",
            "Wrong Answer",
            "Compilation Error",
            "Runtime Error",
            "Time Limit Exceeded"
        ],
        default: "Pending"
    },
    executionTime: {
        type: Number,
        default: 0
    },
    memory: {
        type: Number,
        default: 0
    },
    passedTestCases: {
        type: Number,
        default: 0
    },
    totalTestCases: {
        type: Number,
        default: 0
    },
    output: {
        type: String,
        default: ""
    },
    errorMessage: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;

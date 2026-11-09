const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    topic: {
        type: String,
        required: true
    },

    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Easy"
    },
     // Question Type
    type: {
        type: String,
        enum: ["Coding", "MCQ"],
        default: "Coding"
    },
    // MCQ Options
    options: [{
        type: String
    }],
    // Correct Answer (Backend Only)
    correctAnswer: {
        type: String
    },
    constraints: [{
        type: String
    }],

    examples: [{
        input: String,
        output: String,
        explanation: String
    }],

    testCases: [{
        input: String,
        expectedOutput: String,
        isHidden: {
            type: Boolean,
            default: true
        }
    }],

    points: {
        type: Number,
        default: 10
    }

}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
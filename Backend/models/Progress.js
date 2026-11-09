const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },

    completedLessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson"
    }],

    solvedQuestions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }],

    completedTests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test"
    }],

    totalPoints: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;
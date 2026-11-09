const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }],

    duration: {
        type: Number,
        required: true
    },

    totalMarks: {
        type: Number,
        required: true
    },

    passingMarks: {
        type: Number,
        default: 40
    },

    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner"
    }

}, { timestamps: true });

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    content: {
        type: String,
        required: true
    },

    codeExamples: [{
        type: String
    }],

    practicalImages: [{
        type: String
    }],

    order: {
        type: Number,
        required: true
    }

}, { timestamps: true });

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
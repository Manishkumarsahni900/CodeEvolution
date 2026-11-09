const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    language: {
        type: String,
        enum: ["Java", "C", "C++", "Python", "JavaScript"],
        required: true
    },

    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner"
    },

    thumbnail: {
        type: String,
        default: ""
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
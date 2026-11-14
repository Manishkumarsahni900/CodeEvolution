const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const courseRoutes = require("./routes/courseRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const questionRoutes = require("./routes/questionRoutes");
const testRoutes = require("./routes/testRoutes");
const progressRoutes = require("./routes/progressRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
require("dotenv").config();

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// Auth Routes
app.use("/api/auth", authRoutes);
// User Routes
app.use("/api/users", userRoutes);
// Admin Routes
app.use("/api/admin", adminRoutes);
// Course Routes
app.use("/api/courses", courseRoutes);
// Lesson Routes
app.use("/api/lessons", lessonRoutes);
// Question Routes
app.use("/api/questions", questionRoutes);
// Progress Routes
app.use("/api/progress", progressRoutes);
// Test Routes
app.use("/api/tests", testRoutes);
// Submission Routes
app.use("/api/submissions", submissionRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Server is running");
});

//server
const PORT = process.env.PORT;

connectDB();
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})
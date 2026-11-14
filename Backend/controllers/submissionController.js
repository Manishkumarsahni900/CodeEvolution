const Submission = require("../models/Submission");
const Question = require("../models/Question");
const Progress = require("../models/Progress");
const judge0 = require("../config/judge0");

// Language IDs for Judge0
const languageIds = {
    "C": 50,
    "C++": 54,
    "Java": 62,
    "JavaScript": 63,
    "Python": 71
};

// Run Code
const runCode = async (req, res) => {
    try {
        const { questionId, sourceCode, language } = req.body;

        if (!questionId || !sourceCode || !language) {
            return res.status(400).json({
                message: "Question ID, source code and language are required!"
            });
        }

        const question = await Question.findById(questionId);

        if (!question || question.type !== "Coding") {
            return res.status(404).json({
                message: "Coding question not found!"
            });
        }

        const languageId = languageIds[language];

        if (!languageId) {
            return res.status(400).json({
                message: "Unsupported programming language!"
            });
        }

        const response = await judge0.post(
            "/submissions?base64_encoded=false&wait=true",
            {
                source_code: sourceCode,
                language_id: languageId,
                stdin: question.testCases[0]?.input || ""
            }
        );

        res.status(200).json({
            message: "Code executed successfully!",
            result: response.data
        });

    } catch (error) {
        res.status(500).json({
            message: "Code execution failed!",
            error: error.message
        });
    }
};

// Submit Code
const submitCode = async (req, res) => {
    try {
        const { questionId, sourceCode, language } = req.body;

        if (!questionId || !sourceCode || !language) {
            return res.status(400).json({
                message: "Question ID, source code and language are required!"
            });
        }

        const question = await Question.findById(questionId);

        if (!question || question.type !== "Coding") {
            return res.status(404).json({
                message: "Coding question not found!"
            });
        }

        const languageId = languageIds[language];

        if (!languageId) {
            return res.status(400).json({
                message: "Unsupported programming language!"
            });
        }

        let passedTestCases = 0;
        let status = "Accepted";
        let output = "";
        let errorMessage = "";
        let executionTime = 0;
        let memory = 0;

        for (const testCase of question.testCases) {
            const response = await judge0.post(
                "/submissions?base64_encoded=false&wait=true",
                {
                    source_code: sourceCode,
                    language_id: languageId,
                    stdin: testCase.input
                }
            );

            const result = response.data;
            executionTime += Number(result.time || 0);
            memory = Math.max(memory, Number(result.memory || 0));  

            if (result.status?.id !== 3) {
                status = result.status?.id === 6
                    ? "Compilation Error"
                    : result.status?.id === 5
                    ? "Time Limit Exceeded"
                    : "Runtime Error";

                errorMessage = result.stderr || result.compile_output || result.message || "";
                break;
            }

            const actualOutput = (result.stdout || "").trim();
            const expectedOutput = (testCase.expectedOutput || "").trim();

            if (actualOutput !== expectedOutput) {
                status = "Wrong Answer";
                output = actualOutput;
                break;
            }

            passedTestCases++;
        }

        const submission = await Submission.create({
            user: req.user.id,
            question: questionId,
            sourceCode,
            language,
            status,
            passedTestCases,
            totalTestCases: question.testCases.length,
            output,
            errorMessage,
            executionTime,
            memory
        });

        // Update progress only when the answer is accepted
        if (status === "Accepted") {
            let progress = await Progress.findOne({ user: req.user.id });

            if (!progress) {
                progress = await Progress.create({ user: req.user.id });
            }

            if (!progress.solvedQuestions.some(
                (id) => id.toString() === questionId.toString()
            )) {
                progress.solvedQuestions.push(questionId);
                progress.totalPoints += question.points;
                await progress.save();
            }
        }

        res.status(201).json({
            message: "Code submitted successfully!",
            submission
        });

    } catch (error) {
        res.status(500).json({
            message: "Code submission failed!",
            error: error.message
        });
    }
};


const getMySubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({
            user: req.user.id
        })
            .populate("question", "title difficulty topic")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Submissions fetched successfully!",
            totalSubmissions: submissions.length,
            submissions
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch submissions!",
            error: error.message
        });
    }
};


module.exports = {
    runCode,
    submitCode,
    getMySubmissions
};

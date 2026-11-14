require("dotenv").config();

const axios = require("axios");

const judge0 = axios.create({
    baseURL: process.env.JUDGE0_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
}); 

module.exports = judge0;

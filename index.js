const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const connection = require("./db");
const studentRoutes = require('./routes/StudentRoutes');
const collegeRoutes = require('./routes/CollegeRouter');

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies

// Database connection
connection();

// Routes
app.use("/api", studentRoutes);
app.use("/api", collegeRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

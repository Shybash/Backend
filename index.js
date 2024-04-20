const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const connection = require("./db");
const studentRoutes = require('./routes/StudentRoutes');
const collegeRouters = require('./routes/CollegeRouter');

// Middleware
app.use(cors()); // Allow requests from any origin
app.use(bodyParser.json()); // Parse JSON bodies

// Database connection
connection();

// Routes
app.use("/api", studentRoutes);
app.use("/api", collegeRouters);

const port = process.env.PORT || 4000;
app.listen(port, () => { console.log(`Server is running on ${port}`) });

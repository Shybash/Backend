const express = require('express');
const router = express.Router();
const Query = require('../models/Query');

const StudentQuery = async (query, suggestion) => {
  try {
    // Save the student query and suggestion to the database
    const newStudentQuery = new Query({ query, suggestion });
    await newStudentQuery.save();

    return { success: true, message: 'Query and suggestion submitted successfully.' };
  } catch (error) {
    console.error('Error saving query:', error);
    return { success: false, message: 'An error occurred while saving the query.' };
  }
};

const fetchStudentQueries = async (req, res) => {
  try {
    // Fetch all student queries from the database
    const queries = await Query.find();
    res.json(queries);
  } catch (error) {
    console.error('Error fetching queries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { StudentQuery, fetchStudentQueries }; // Export as an object with named properties

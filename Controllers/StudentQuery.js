const Query = require('../models/Query');

const studentQuery = async (req, res) => {
  try {
    // Save the student query and suggestion to the database
    const { query, suggestion } = req.body;
    const newStudentQuery = new Query({ query, suggestion });
    await newStudentQuery.save();

    res.status(201).json({ success: true, message: 'Query and suggestion submitted successfully.' });
  } catch (error) {
    console.error('Error saving query:', error);
    res.status(500).json({ success: false, message: 'An error occurred while saving the query.' });
  }
};

const fetchStudentQueries = async (req, res) => {
  try {
    // Fetch all student queries from the database
    const queries = await Query.find();
    res.status(200).json(queries);
  } catch (error) {
    console.error('Error fetching queries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { studentQuery, fetchStudentQueries };

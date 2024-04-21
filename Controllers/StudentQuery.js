const Query = require('../models/Query');

const studentQuery = async (req, res) => {
  try {
    // Extract query and suggestion from request body
    const { query, suggestion } = req.body;
    
    // Create a new Query instance
    const newStudentQuery = new Query({ query, suggestion });

    // Save the new query to the database
    await newStudentQuery.save();

    // Send success response
    res.status(201).json({ success: true, message: 'Query and suggestion submitted successfully.' });
  } catch (error) {
    // If an error occurs, log it and send error response
    console.error('Error saving query:', error);
    res.status(500).json({ success: false, message: 'An error occurred while saving the query.' });
  }
};

module.exports = { studentQuery};

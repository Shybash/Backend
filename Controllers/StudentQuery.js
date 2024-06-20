const Query = require('../models/Query');

const studentQuery = async (req, res) => {
  try {
    const { query, suggestion } = req.body;
    
    const newStudentQuery = new Query({ query, suggestion });

    await newStudentQuery.save();

    res.status(201).json({ success: true, message: 'Query and suggestion submitted successfully.' });
  } catch (error) {
    console.error('Error saving query:', error);
    res.status(500).json({ success: false, message: 'An error occurred while saving the query.' });
  }
};

module.exports = { studentQuery};

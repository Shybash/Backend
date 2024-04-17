// Import necessary dependencies

const Club = require('./models/Club');

// Create a named function for fetching clubs
async function GetClubs(req, res) {
  try {
    // Fetch all clubs from the database
    const clubs = await Club.find();
    res.json(clubs);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ message: 'An error occurred while fetching clubs' });
  }
}

// Export the function
module.exports = GetClubs;

// controllers/ClubController.js

const Club = require('../models/Club');

// Controller to fetch only club names
const GetClubs = async (req, res) => {
  try {
    const clubs = await Club.find({}, 'name'); // Only retrieve the 'name' field
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  GetClubs
};

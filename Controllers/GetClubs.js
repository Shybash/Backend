
const Club = require('../models/Club');

const GetClubs=async(req, res) =>{
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ message: 'An error occurred while fetching clubs' });
  }
}
module.exports = GetClubs;
